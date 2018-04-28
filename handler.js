'use strict';

const Todo = require('./todo');

module.exports.create = async (event, context, callback) => {
    let data;
    try {
        data = JSON.parse(event.body);
        if (typeof data.text !== 'string') {
            console.error('Validation Failed');
            callback(null, {
                statusCode: 400,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t create the todo item.',
            });
            return;
        }
    }
    catch (error) {
        console.error(error);
        callback(null, {
            statusCode: 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t create the todo item.',
        });
        return;
    }

    try {
        let item = await Todo.create({
            text: data.text,
            checked: Number(data.checked) || 0
        })
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(item.get({ plain: true })),
        });
    }
    catch (error) {
        console.error(error);
        callback(null, {
            statusCode: 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t create the todo item.',
        });
    }
};

module.exports.delete = async (event, context, callback) => {
    const data = JSON.parse(event.body);
    try {
        await Todo.destroy({
            id: data.id
        })

        callback(null, {
            statusCode: 200,
            body: JSON.stringify({}),
        });
    }
    catch (error) {
        console.error(error);
        callback(null, {
            statusCode: 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t remove the todo item.',
        });
    }
};

module.exports.get = async (event, context, callback) => {
    const data = JSON.parse(event.body);

    try {
        let item = await Todo.findOne({
            id: data.id,
            raw: true,
        })

        if (!item) {
            callback(null, {
                statusCode: 404,
                body: JSON.stringify({}),
            });
        }
        else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(item),
            });
        }
    }
    catch (error) {
        console.error(error);
        callback(null, {
            statusCode: 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t fetch the todo item.',
        });
    }
};

module.exports.list = async (event, context, callback) => {
    const data = JSON.parse(event.body);

    try {
        let items = await Todo.findAll({
            raw: true
        })
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(items)
        });
    }
    catch (error) {
        console.error(error);
        callback(null, {
            statusCode: 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t fetch the todos.',
        });
    }
};

module.exports.update = async (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    // validation
    if (typeof data.text !== 'string' || (data.checked !== "0" && data.checked !== "1")) {
        console.error('Validation Failed');
        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t update the todo item.',
        });
        return;
    }
    try {
        let item = await Todo.findOne({
            where: {
                id: data.id
            },
            raw: true
        })

        if (!item) {
            console.error('Id not found');
            callback(null, {
                statusCode: 404,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t find the todo item.',
            });
            return;
        }

        item.update({
            text: data.text,
            checked: Number(data.checked) || 0,
            updateAt: timestamp,
        })

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(item)
        });
    }
    catch (error) {
        console.error(error);
        callback(null, {
            statusCode: 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t update the todo item.',
        });
    }
};

module.exports.landingPage = (event, context, callback) => {
    let dynamicHtml = '<p>Hey Unknown!</p>';
    // check for GET params and use if available
    if (event.queryStringParameters && event.queryStringParameters.name) {
        dynamicHtml = `<p>Hey ${event.queryStringParameters.name}!</p>`;
    }

    const html = `
    <html>
        <style>
            h1 { color: #73757d; }
        </style>
        <body>
            <h1>Landing Page</h1>
                ${dynamicHtml}
        </body>
    </html>`;

    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },
        body: html,
    };

    // callback is sending HTML back
    callback(null, response);
};