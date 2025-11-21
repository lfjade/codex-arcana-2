const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const dbPath=path.resolve(__dirname, 'codex-arcana.db')
const db = new sqlite3.Database(dbPath)

module.exports = {
    run(query, params = []) {
        return new Promise((resolve, reject) => {
            db.run(query, params, function (err) {
                if (err) reject (err)
                    else resolve (this)
            })
        })
    },
    get(query, params = []) {
        return new Promise((resolve, reject) => {
            db.get(query, params, function (err, row) {
                if (err) reject (err)
                else resolve (row)
            })
        })
    },
    all(query, params = []) {
        return new Promise((resolve, reject) => {
            db.all(query, params, function (err, rows) {
                if (err) reject (err)
                else resolve(rows)
            })
        })
    }
}