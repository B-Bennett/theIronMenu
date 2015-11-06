package com.theironyard;

import jodd.json.JsonSerializer;
import spark.Spark;

import java.sql.*;
import java.util.ArrayList;

public class Main {
    public static void createTable(Connection conn) throws SQLException {
        Statement stmt = conn.createStatement();
        stmt.execute("CREATE TABLE IF NOT EXISTS menu (id IDENTITY, name VARCHAR, type VARCHAR, breakfast BOOLEAN, lunch BOOLEAN, dinner BOOLEAN, price DECIMAL, vegetarian BOOLEAN, glutenFree BOOLEAN, priceRange int)");
    }

    public static void insertMenuItem(Connection conn, int id, String name, String type, boolean breakfast, boolean lunch, boolean dinner, double price, boolean vegetarian, boolean glutenFree, int priceRange) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("INSERT INTO menu VALUES (NULL,?,?,?,?,?,?,?,?,?)");
        stmt.setString(1, name);
        stmt.setString(2, type);
        stmt.setBoolean(3, breakfast);
        stmt.setBoolean(4, lunch);
        stmt.setBoolean(5, dinner);
        stmt.setDouble(6, price);
        stmt.setBoolean(7, vegetarian);
        stmt.setBoolean(8, glutenFree);
        stmt.setInt(9, priceRange);
        stmt.execute();
    }

    public static MenuItem selectMenuItem(Connection conn, int id) throws SQLException {
        MenuItem item = null;
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM menu WHERE id = ?");
        stmt.setInt(1, id);
        ResultSet results = stmt.executeQuery();
        if (results.next()) {
            item = new MenuItem();
            item.id=results.getInt("id");
            item.name = results.getString("name");
            item.type = results.getString("type");
            item.breakfast = results.getBoolean("breakfast");
            item.lunch = results.getBoolean("lunch");
            item.dinner = results.getBoolean("dinner");
            item.price = results.getDouble("price");
            item.vegetarian = results.getBoolean("vegetarian");
            item.glutenFree = results.getBoolean("glutenFree");
            item.priceRange = results.getInt("priceRange");
        }
        return item;
    }

    public static ArrayList<MenuItem> selectMenu(Connection conn) throws SQLException {
        ArrayList<MenuItem> items = new ArrayList<>();
        PreparedStatement stmt = conn.prepareStatement("Select * FROM menu");
        ResultSet results = stmt.executeQuery();
        while (results.next()) {
            MenuItem item = new MenuItem();
            item.id = results.getInt("id");
            item.name = results.getString("name");
            item.type = results.getString("type");
            item.breakfast = results.getBoolean("breakfast");
            item.lunch = results.getBoolean("lunch");
            item.dinner = results.getBoolean("dinner");
            item.price = results.getDouble("price");
            item.vegetarian = results.getBoolean("vegetarian");
            item.glutenFree = results.getBoolean("glutenFree");
            item.priceRange = results.getInt("priceRange");
            items.add(item);
        }
        return items;
    }

    static void editItem (Connection conn, int id, String name, String type, boolean breakfast, boolean lunch, boolean dinner, double price, boolean vegetarian, boolean glutenFree, int priceRange) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("UPDATE menu SET name =?, type=?, breakfast = ?,lunch = ?, dinner = ? price =?, vegetarian = ? gultenFree =?, priceRange = ? WHERE id =? ");
        stmt.setString(1, name);
        stmt.setString(2, type);
        stmt.setBoolean(3, breakfast);
        stmt.setBoolean(4, lunch);
        stmt.setBoolean(5, dinner);
        stmt.setDouble(6, price);
        stmt.setBoolean(7, vegetarian);
        stmt.setBoolean(8, glutenFree);
        stmt.setInt(9, priceRange);
        stmt.execute();
    }

    static void deleteItem (Connection conn, int id) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("DELETE FROM menu WHERE id =?");
        stmt.setInt(1, id);
        stmt.execute();
    }


    public static void main(String[] args) throws SQLException {
        Connection conn = DriverManager.getConnection("jdbc:h2:./main");
        createTable(conn);

        Spark.externalStaticFileLocation("client");
        Spark.init();

        //inserting test data
        if (selectMenu(conn).size() == 0) {
            Main.insertMenuItem(conn, 1, "Steak", "entree", true, true, true, 25.00, false, false, 2);
            Main.insertMenuItem(conn, 2,"Salad", "app", false, true, true, 10.00, true, true, 1);
            Main.insertMenuItem(conn, 3, "Beer", "drink", true, true, true, 7.00, true, false, 1);
            Main.insertMenuItem(conn, 4, "BLT", "entree", false, true, true, 12.50, false, false, 1);
        }
        //creating routes for Ajax
        Spark.get(
                "/menu",
                ((request, response) -> {
                    JsonSerializer serializer = new JsonSerializer();
                    String json = serializer.serialize(selectMenu(conn));
                    return json;
                })
        );
        Spark.post(
                "/add-item",
                ((request, response) -> {
                    int id = Integer.valueOf(request.queryParams("id"));
                    String name = request.queryParams("name");
                    String type = request.queryParams("type");
                    Boolean isBreakfast = Boolean.valueOf(request.queryParams("breakfast"));
                    boolean isLunch = Boolean.valueOf(request.queryParams("lunch"));
                    boolean isDinner = Boolean.valueOf(request.queryParams("dinner"));
                    double price = Double.valueOf(request.queryParams("price"));
                    boolean isVegetarian = Boolean.valueOf(request.queryParams("vegetarian"));
                    boolean isGlutenFree = Boolean.valueOf(request.queryParams("glutenFree"));
                    int priceRange = Integer.valueOf(request.queryParams("priceRange"));
                    if (name == null || type == null) {
                        Spark.halt(403);
                    }
                    insertMenuItem(conn, id, name, type, isBreakfast, isLunch, isDinner, price, isVegetarian, isGlutenFree, priceRange);
                    return "";
                })
        );
        Spark.post(
                "/edit-item",
                ((request, response) -> {
                    int id = Integer.valueOf(request.queryParams("id"));
                    String name = request.queryParams("name");
                    String type = request.queryParams("type");
                    Boolean isBreakfast = Boolean.valueOf(request.queryParams("breakfast"));
                    boolean isLunch = Boolean.valueOf(request.queryParams("lunch"));
                    boolean isDinner = Boolean.valueOf(request.queryParams("dinner"));
                    double price = Double.valueOf(request.queryParams("price"));
                    boolean isVegetarian = Boolean.valueOf(request.queryParams("vegetarian"));
                    boolean isGlutenFree = Boolean.valueOf(request.queryParams("glutenFree"));
                    int priceRange = Integer.valueOf(request.queryParams("priceRange"));
                    try {
                        int idNum = Integer.valueOf(id);
                        editItem(conn, idNum, name, type, isBreakfast, isLunch, isDinner, price, isVegetarian, isGlutenFree, priceRange);
                    }catch (Exception e){
                    }
                    response.redirect("/menu");
                    return "";
                })
        );
        Spark.post(
                "/delete-item",
                ((request, response) -> {
                    String id = request.queryParams("id");
                    try{
                        int idNum = Integer.valueOf(id);
                        deleteItem(conn,idNum);
                    }catch (Exception e){

                    }
                    response.redirect("/menu");
                    return "";
                })
        );
    }
}
