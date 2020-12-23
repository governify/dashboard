# Governify Grafana Plugins Development

This is the folder where are stored all the custom plugins for Governify Grafana ecosystem.

## Development workspace configuration
In order to make changes to the plugins here, the best way to configure the workspace is:
1. Clone repository
2. Deploy Governify Grafana image in a container with a volume to folder plugins.
> docker run -d --name governify-grafana-dev -p '3000:3000' -v ${PWD}/plugins:/var/lib/grafana/plugins isagroup/governify-grafana

(This command should be run from inside repository folder. You can specify your grafana image if you are making changes also to grafana image)

3. Open a console in the plugin folder that you want to modify

4. Install yarn in case you don't have it
> npm install -g yarn

5. Install the packages
> yarn install

6. Start yarn watcher
> yarn watch

7. Now you can modify the plugin and see the changes in realtime in the container deployed
