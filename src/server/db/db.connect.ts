import sqlite3 from 'sqlite3';

class Database {
	db: sqlite3.Database;
	constructor() {
		this.db = new sqlite3.Database('./app.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
			if (err) {
				console.error(err.message);
			} else {
				console.log('Connected to the database.');
			}
		});
		this.db.on('close', () => {
			console.log('Database connection closed.');
		});
	}
	
	run = async	<T>(query: string, param?: T) => {
		return new Promise<void>((resolve, reject) => {
			this.db.run(query, param, (err) => {
				if(err) {
					reject(err);
				} else {
					resolve();            
				}
			})
		})
	}

	get = async	<T>(query: string, param?: T) => {
		return new Promise<void>((resolve, reject) => {
			this.db.get(query, param, (err) => {
				if(err) {
					reject(err);
				} else {
					resolve();            
				}
			})
		})
	}

	all = async <T>(query: string, params?: T) => {
		return new Promise((resolve, reject) => {
			this.db.all(query, params,  (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	close = async () => {
		return new Promise((resolve, reject) => {
			this.db.close((err) => {
				if (err) {
					reject(err);
				} else {
					resolve({message: 'Database connection closed.'});
				}
			});
		});
	}
}

const db = new Database();
export default db;







