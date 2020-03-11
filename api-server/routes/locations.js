
const locationRoutes = (app, fs) => {

    // variables
    const dataPath = './data/data.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }
            callback();
        });
    };

    // READ
    app.get('/locations', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // Get specific
    app.get('/locations/:id', (req, res) => {

        readFile((data) => {

            const id = req.params["id"];
            console.log(id);
            console.log(data);

            // console.log(req.params);
            // console.log(data[1])
            // res.send(data[id]);
            res.status(200).send(`sensor id: ${id} details`);
            // res.send(data["1"]);
        });
    });

    // CREATE
    app.post('/locations', (req, res) => {

        readFile(data => {
            const newUserId = Object.keys(data).length + 1;

            // add the new user
            req.body.id = newUserId;
            data[newUserId - 1] = req.body;
            console.log(data[newUserId - 1]);
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new user added');
            });
            delete data[newUserId];
        },
            true);
    });


    // UPDATE
    app.put('/locations/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            data[userId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/locations/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            delete data[userId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    });
};

module.exports = locationRoutes;