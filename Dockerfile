FROM grafana/grafana:latest
USER root
# Update default config with Governify custom config
COPY defaults.ini conf/defaults.ini
# Insert custom files to public folder. (Dashboard Loader, custom images, etc)
ADD public public
# Insert grafana plugins folder
ADD plugins /var/lib/grafana/plugins
# Add default datasources
ADD datasources /etc/grafana/provisioning/datasources
# Insert Governify Overlay JS to all grafana views
RUN echo '<script src="public/views/grafanaOverlay.js" type="text/javascript"> </script>' >> public/views/index.html
USER grafana