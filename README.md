# About

## Intro

 Search through content of github projects and getting most popular from them.
 The GitHub API allows to get up to 1000 results.
 So the program will not give you result on all existed projects on GitHub.

## Before start

Create .env this following config where you should specify your.

- access token: [<https://github.com/settings/tokens]>
- API : GITHUB API
- QUERY : this field used on "q" param of url

ex:

```sh
ACCESS_TOKEN  = '34535f16c7a154d84d0fd06a6e7a494ef7a74f4d13/b'
API = 'https://api.github.com/search'
QUERY = 'NOT+%20class%20+AND+type%20+language:ts'
```

ACCESS_TOKEN  = 443f16c7a154d84d0fd06a6e7a494ef7a74f4d13
API = <https://api.github.com/search>
QUERY = NOT class AND type

## Installation

```sh
npm install
npm start
```

## Files

- ### Projects.json - contains full_names of projects (owner/repo) cached from api result
  
- ### ratedProjects.json - contains full_names and stars of projects (owner/repo) cached from api result

- ### top.json - contains the most popular projects
  