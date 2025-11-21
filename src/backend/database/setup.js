const db = require('./database.js')

db.exec(`
    CREATE TABLE IF NOT EXISTS feiticos (
        idfeitico INTEGER PRIMARY KEY AUTOINCREMENT,
        ritualistica TEXT,
        titulo VARCHAR(127)
    );

    CREATE TABLE IF NOT EXISTS componentes (
        idcomponente INTEGER PRIMARY KEY AUTOINCREMENT,
        nome VARCHAR(127)
    );

    CREATE TABLE IF NOT EXISTS feiticos_has_componentes (
        idfeitico INTEGER,
        idcomponente INTEGER,
        PRIMARY KEY (idfeitico, idcomponente),
        FOREIGN KEY (idfeitico) REFERENCES feiticos(idfeitico) ON DELETE CASCADE,
        FOREIGN KEY (idcomponente) REFERENCES componentes(idcomponente) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS tags (
        idtag INTEGER PRIMARY KEY AUTOINCREMENT,
        nome VARCHAR(127)
    );

    CREATE TABLE IF NOT EXISTS feiticos_has_tags (
        idfeitico INTEGER,
        idtag INTEGER,
        PRIMARY KEY (idfeitico, idtag),
        FOREIGN KEY (idfeitico) REFERENCES feiticos(idfeitico) ON DELETE CASCADE,
        FOREIGN KEY (idtag) REFERENCES tags(idtag) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS diarios (
        iddiario INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo VARCHAR(127),
        criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
        texto TEXT
    );

    CREATE TABLE IF NOT EXISTS diarios_has_tags (
        iddiario INTEGER,
        idtag INTEGER,
        PRIMARY KEY (iddiario, idtag),
        FOREIGN KEY (iddiario) REFERENCES diarios(iddiario) ON DELETE CASCADE,
        FOREIGN KEY (idtag) REFERENCES tags(idtag) ON DELETE CASCADE
    )
    `)