<p align="center">
<img align="center" src="https://i.imgur.com/g3915g1.png" width="700">
</p>
 
# Governify Grafana
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Repository with the docker files to build the custom grafana image for Governify Project.
Default user and password:
> - User: governify-admin
 > - Password: governify-project

Customizations:
- Custom scripted dashboard to load JSON from external URL:

https://host.com/dashboard/script/dashboardLoader.js?dashboardURL={ExternalURL}
- Disabled HTML sanitization
- Custom default admin and password
