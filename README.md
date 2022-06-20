# SocialStarterBackend
Dev heroku link:

- https://social-starter-dev.herokuapp.com/

Endpoint documentation:

- https://documenter.getpostman.com/view/9674248/Uz5CLxoi


To run:

- download repository
- docker-compose build
- docker-compose up -d

To test:

- without logs:
  - docker-compose exec web npm run test
- with logs:
  - docker-compose exec web npx jest --runInBand



