# GitLab Home Page Clone
![Front-end Development](https://img.shields.io/badge/frontend%20development-%23404d59.svg?style=for-the-badge)
![Web Development](https://img.shields.io/badge/web%20development-%232671E5.svg?style=for-the-badge)
![Web Application](https://img.shields.io/badge/web%20application-6DA55F?style=for-the-badge)
![User Interface](https://img.shields.io/badge/user%20interface-%23323330.svg?style=for-the-badge)
![GitLab](https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge)

The project is academic. It's made to evaluate my level in
native web development languages; test my capacity to build
advanced user interfaces with HTML, CSS and JavaScript only
and learn more things about those technologies. It's a
front-end project only. No any back-end API is called.
The main goal of this project is to reproduce the old
GitLab home page only.

## Table of contents
1. [Access links](#links)
2. [Reference](#ref)
3. [Final result](#result)
    1. [Video](#video)
    2. [Screenshots](#images)
5. [Project installation](#install)
    1. [Nodejs installation](#node-install)
    2. [Sources code cloning](#cloning)
    3. [Dependencies installation](#dev-install)
    4. [Project execution](#running)

## Access links <a id = "links"></a>
The project is already hosted on web and can be
accessible through one of these links below :<br/>
- https://obrymec.github.io/gitlab_home_page_clone
- https://obrymec.gitlab.io/gitlab_home_page_clone
- https://gitlab-home-page-clone.onrender.com

## Reference <a id = "ref"></a>
The project can be found via the link below :<br/>
- https://gitlab.com/obrymec/gitlab_home_page_clone

## Final result <a id = "result"></a>
This is the final result of the project :<br/><br/>
### Video <a id = "video"></a>
[![Watch the project's video](https://img.youtube.com/vi/j7LeZvGRDzQ/maxresdefault.jpg)](https://youtu.be/j7LeZvGRDzQ)

### Screenshots <a id = "images"></a>
![First render](./assets/render/render_1.png)
![Second render](./assets/render/render_2.png)
![Third render](./assets/render/render_3.png)
![Fourth render](./assets/render/render_4.png)

## Project installation <a id = "install"></a>
⚠️ This project uses some nodejs packages for code
minification, css purge and auto prefixer for his
production phase.
If you want to use <i><a href = "https://code.visualstudio.com/download">
vscode</a></i> to open the project sources,
you can skip all steps before clone the project
sources code and also dependencies installation
whether you want. Otherwise, <b><i>it's
mandatory to follow the steps below</i></b>.

### Nodejs installation <a id = "node-install"></a>
```sh
cd ~;\
sudo apt install curl;\
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash;\
source ~/.bashrc;\
nvm --version;\
nvm install --lts;\
node --version;\
npm install yarn --global;\
yarn --version
```

### Sources code cloning <a id = "cloning"></a>
```sh
git clone git@github.com:obrymec/gitlab_home_page_clone.git gitlab_home_page/
```

### Dependencies installation <a id = "dev-install"></a>
Go to the root folder of the project sources
and run :
```sh
yarn install
```

### Project execution <a id = "running"></a>
Whether the project sources is opening with
<i><a href = "https://code.visualstudio.com/download">
vscode</a></i>, follow the steps below :

- Make sure that your computer is connected
to Internet;

- Go to extensions section and tap `live server`
within extensions search bar;

- Then, install it. After installation, close
your <i><a href = "https://code.visualstudio.com/download">
vscode</a></i> and open it again;

- When that is done, open `index.html` file
inside `./public/index.html` and make a right
click;

- In the displayed contextual menu, click on
`Open with Live Server...`

Whether you don't using <i>
<a href = "https://code.visualstudio.com/download">vscode</a></i>,
go to the root folder of the project and run :
```sh
yarn start
```

Then, open your favorite browser and tap on
the search bar, the following link :
```sh
http://localhost:5000/
```

Enjoy :)
