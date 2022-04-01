var fs = require('fs');
const path = require("path");
const MySqlClient = require('./db');


class CustomerController {
    constructor() {
        this.idCount = 0
        this.localModel = JSON.parse(fs.readFileSync(path.resolve(__dirname, ".././data/customer.json")));
        this.dbClient = new MySqlClient()
        this.CreateTable()

    }

    CreateTable() {
        if (process.env.DB === "local") {
            return
        }
        let sql = "CREATE TABLE Customers (email varchar(255),last_name varchar(255),first_name varchar(255),id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY)"
        this.dbClient.Execute(sql, function (results, fields) {
            //success
            console.log("Table Created Successfully")
        }, function (error) {
            //error
            console.log(error)
        })
    }

    async CreateCustomer(emaildId, firstName, lastName) {
        if (process.env.DB === "local") {
            let model = {
                "id": this.idCount++,
                "email": emaildId,
                "first_name": firstName,
                "last_name": lastName
            }
            this.localModel.push(model)
            return new Promise(function (resolve, reject) { resolve(model) })
        }
        //call to MySQL database
        let sql = "INSERT INTO Customers (email, first_name, last_name) VALUES ('" + emaildId + "', '" + firstName + "', '" + lastName + "')"
        let getId = "SELECT LAST_INSERT_ID()"
        var _this = this

        return new Promise(function (resolve, reject) {
            _this.dbClient.Execute(sql, function (results, fields) {
                _this.dbClient.Execute(getId, function (results, fields) {
                    if (results.length > 0) {
                        resolve({
                            "id": results[0]["LAST_INSERT_ID()"],
                            "email": emaildId,
                            "first_name": firstName,
                            "last_name": lastName
                        })
                    }
                }, function () {
                    reject(error)
                })
            }, function (error) {
                reject(error)
            })
        })
    }

    async GetAllCustomers() {

        if (process.env.DB === "local") {
            return new Promise(function (resolve, reject) { resolve(this.localModel) })
        }
        var _this = this

        return new Promise(function (resolve, reject) {
            _this.dbClient.Execute("SELECT * FROM Customers", function (results, fields) {
                resolve(results)
            }, function (error) {
                reject(error)
            })
        })

    }

    GetCustomer(id) {
        if (process.env.DB === "local") {
            for (const eachCustomer of this.localModel) {
                if (eachCustomer["id"] == id) {
                    return new Promise(function (resolve, reject) { resolve(eachCustomer) })
                }
            }
            return new Promise(function (resolve, reject) { resolve() })
        }
        var _this = this
        return new Promise(function (resolve, reject) {
            _this.dbClient.Execute("SELECT * FROM Customers where id=" + id, function (results, fields) {
                resolve(results)
            }, function (error) {
                reject(error)
            })
        })
    }
}
module.exports = CustomerController