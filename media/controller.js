const Media = require('./model');
const fs = require('fs');
const Promisify = require('util').promisify;
const uuid = require('uuid').v4;
const path = require('path');
const mime = require('mime');
const Config = require('../environment/index');
const baseUrl = '/media/download/';

exports.add = (req, res) => {
    try {
        const _b = req.body;
        let media = (req.dir || []).map(file => {
            return {
                url: Config.server.url + baseUrl + file.fullName,
                type: file.type
            };
        });
        if (_b.link && _b.link.length) media = media.concat(_b.link.map(y => {
            return {url: y, type: 'link'}
        }));
        Media.bulkCreate(media)
            .then(result => res.json({status: true, data: result}))
            .catch(error => {
                console.error(error);
                res.status(400).json({status: false, error: error});
            });
    } catch (error) {
        res.json({status: false, error: error})
    }
};

exports.update = (req, res) => {
    const _b = req.body;
    try {
        const _b = req.body;
        console.log(_b);
        Media.findOne({where: {id: _b.MediaId}})
            .then(media => {
                if (!media) throw new Error('now data found');
                const url = media.url;
                media.url = Config.server.url + baseUrl + req.dir[0].fullName;
                media.type = req.dir[0].type;
                const promises = [media.save()];
                if (url) promises.push((Promisify(fs.unlink))(path.join(__dirname, '../uploads', url.split('/').pop())));
                return Promise.all(promises);
            })
            .then(result => res.json({status: true, data: result[0]}))
            .catch(error => res.json({status: false, error: error}));
    } catch (error) {
        console.error(error);
        res.json({status: false, error: error})
    }
};
exports.updateUrl = (req, res) => {
    const _b = req.body;
    try {
        Media.findOne({where: {id: _b.MediaId}})
            .then(media => {
                if (!media) throw new Error('now data found');
                media.url = _b.link;
                return media.save();
            })
            .then(result => res.json({status: true, data: result}))
            .catch(error => {
                console.error(error);
                res.status(400).json({status: false, error: error})
            });
    } catch (error) {
        console.error(error);
        res.json({status: false, error: error})
    }
};
exports.delete = (req, res) => {
    try {
        const _b = req.body;
        Media.findOne({where: {id: _b.MediaId}})
            .then(media => {
                if (!media) throw new Error('no data found');
                const url = media.url;
                const promises = [media.destroy()];
                if (url) promises.push((Promisify(fs.unlink))(path.join(__dirname, '../uploads', url.split('/').pop())));
                return Promise.all(promises);
            })
            .then(result => res.json({status: true, data: result[0]}))
            .catch(error => {
                console.error(error);
                res.status(400).json({status: false, error: error})
            });
    } catch (error) {
        console.error(error);
        res.status(400).json({status: false, error: error})
    }
};

exports.download = (req, res) => {
    console.log('download');
    const filePath = path.join(__dirname, '../uploads', req.params.id);
    console.log(filePath);
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1;

        if (start >= fileSize) {
            res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
            return
        }

        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(filePath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': mime.getType(filePath),
        };

        res.writeHead(206, head);
        file.pipe(res)
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': mime.getType(filePath),
        };
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res)
    }
};
