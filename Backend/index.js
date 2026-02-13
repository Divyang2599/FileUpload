const { CosmosClient } = require('@azure/cosmos');

module.exports = async function (context, req) {
    const endpoint = process.env['COSMOS_ENDPOINT'];
    const key = process.env['COSMOS_KEY'];
    const client = new CosmosClient({ endpoint, key });
    const database = client.database('EventDB');
    const container = database.container('Registrations');

    if (req.method === 'POST') {
        const item = req.body;
        item.id = Date.now().toString();
        await container.items.create(item);
        context.res = { status: 200, body: 'Success' };
    } else if (req.method === 'GET' && req.query.admin === 'true') {
        const { resources } = await container.items.readAll().fetchAll();
        context.res = { status: 200, body: resources, headers: { 'Content-Type': 'application/json' } };
    } else {
        context.res = { status: 405, body: 'Method not allowed' };
    }
};