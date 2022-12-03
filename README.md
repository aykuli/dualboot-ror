# Task manager

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fhttps%3A%2F%2Fgithub.com%2Faykuli%2Fdualboot-ror%2Fbadge%3Fref%3Ddevelop&style=plastic)](https://actions-badge.atrox.dev/https://github.com/aykuli/dualboot-ror/goto?ref=develop)
[![Coverage Status](https://coveralls.io/repos/github/aykuli/dualboot-ror/badge.svg?branch=develop)](https://coveralls.io/github/aykuli/dualboot-ror?branch=develop)

**Learning platform**: [Dualboot Partners courses](https://learn.dualboot.ru/courses)
**Student**: Aynur Shauerman aykuli@ya.ru

## Description

Project should work as [the Trello](https://trello.com/)

## Development

- Build containers

```bash
docker-compose build
```

- Install gems

```bash
  docker-compose run --rm web bash -c "bundle install"
```

- Opening interactive bash session inside docker container:

```bash
docker-compose run --rm --service-ports web /bin/bash
```

- Checking code style

```bash
bundle exec rubocop -a
```

To watch letters locally in development open link: [http://localhost:3000/letter_opener](http://localhost:3000/letter_opener)

## Webpacker

After installing ` webpacker` run this command to build files in `public` folder:

```bash
bundle exec rails assets:precompile
bundle exec rails webpacker:compile
```

To generate coverage report run test:

```bash
rails test
```

## Sidekiq

- Web panel `http://localhost:3000/admin/sidekiq`

* Retries `http://localhost:3000/admin/sidekiq/retries`

* Failures `http://localhost:3000/admin/sidekiq/failures`
