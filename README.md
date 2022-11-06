# Task manager

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

## Webpacker

After installing ` webpacker` run this command to build files in `public` folder:

```bash
bundle exec rails assets:precompile
bundle exec rails webpacker:compile
```
