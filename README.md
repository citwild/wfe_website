# WFE school project


## Development
Starting with:
[Orchestrate.io](https://orchestrate.io/blog/2014/06/26/build-user-authentication-with-node-js-express-passport-and-orchestrate/)

## Run

### Install nodejs on Ubuntu

Use `apt-get`:
```
sudo apt-get install nodejs
```

### To run the node server
```
node server/index.js
```

or use `nodemon` in place of `node`, which auto restarts server when source codes changes (recommended).
There is no need to use apache or nginx web server for now, the node built-in web server is pretty stable and performant.

To install nodemon:
```
sudo npm -g install nodemon
```

## Testing
We are currently using the [Mocha](https://mochajs.org/) test framework until a team decision is made to use something else.

Tests are located in `server/test`.

To run tests, use command:
```
npm test
```

## AWS
By default, any EC2 instance server has restricted exposure of ports, so you cannot access from internet out of the box.

To open web port:
http://stackoverflow.com/questions/5004159/opening-port-80-ec2-amazon-web-services/10454688#10454688

Login:
```
ssh -i wfe.pem ubuntu@ec2-52-32-38-91.us-west-2.compute.amazonaws.com
```
You could use Putty on Windows instead of `ssh`.


The pem key for this particular test EC2 was sent via email (generated within Wei's personal AWS account). To use our UW account, generate key from that account.

Online access (testing only, EC2 from Wei's account):
http://ec2-52-32-38-91.us-west-2.compute.amazonaws.com:5000/

## Issues
Fix Ubuntu nodemon "cannot find node" issue: The reason is that node is called nodejs on Ubuntu, just do this to fix:
```
sudo ln -s /usr/bin/nodejs /usr/local/bin/node
```
To keep server from exiting when you exit your terminal, use this trick:

Use a `nohup` prefix to keep it running in the background:
http://www.cyberciti.biz/tips/nohup-execute-commands-after-you-exit-from-a-shell-prompt.html

## TODO
1. move to UW domain
2. show controlled access to s3 objects (download/view files)

## Roadmap
1. User auth
2. File access control
3. Role management
4. Files searching
5. Video/Audio playing
6. 2-FA
7. Annotation collaboration

## Database schema design
1. study has sub-studies
2. permission, per person/group, per study
3. per study, a set of media files
4. data: research papers, transcripts, video, audio, picture

## Use Cases
1. oceangraphers: sensors under sea (see COVE ocean UW project)

## Dev Ideas
More on dev ideas moved to `dev.md`

1. To control access fo S3 objects, we could use the same logic to control access to password data
