$(function() {
    var vulnerablePluginsSection = $('#sec-plugin-vulnerable'),
        vulnerablePluginsBody = $('#plugin-vulnerable'),
        vulnerablePluginsHtml = '',
        outdatedPluginsSection = $('#sec-plugin-outdated'),
        outdatedPluginsBody = $('#plugin-outdated'),
        outdatedPluginsHtml = '',
        unknownPluginsSection = $('#sec-plugin-unknown'),
        unknownPluginsBody = $('#plugin-unknown'),
        unknownPluginsHtml = '',
        upToDatePluginsSection = $('#sec-plugin-uptodate'),
        upToDatePluginsBody = $('#plugin-uptodate'),
        upToDatePluginsHtml = '';

    var showPlugin = function(data) {
        // If the latest response from the service was a vulnerable plugin,
        // pass the object here.
        if(data.vulnerablePlugins) {
            vulnerablePluginsHtml = Mustache.to_html(vulnerablePluginsTmpl, data);
            vulnerablePluginsBody.append(vulnerablePluginsHtml);
            // If this section is already visible, do not
            // bother to call show and save some repainting.
            if(!vulnerablePluginsSection + ':visible') {
                vulnerablePluginsSection.show();
            }
        }

        // If the latest response from the service was a outdated plugin,
        // pass the object here.
        if(data.outdatedPlugins) {
            outdatedPluginsHtml = Mustache.to_html(outdatedPluginsTmpl, data);
            outdatedPluginsBody.append(outdatedPluginsHtml);
            // If this section is already visible, do not
            // bother to call show and save some repainting.
            if(!outdatedPluginsSection + ':visible') {
                outdatedPluginsSection.show();
            }
        }

        // If the latest response from the service was an unknown plugin,
        // pass the object here.
        if(data.unknownPlugins) {
            unknownPluginsHtml = Mustache.to_html(unknownPluginsTmpl, data);
            unknownPluginsBody.append(unknownPluginsHtml);
            // If this section is already visible, do not
            // bother to call show and save some repainting.
            if(!unknownPluginsSection + ':visible') {
                unknownPluginsSection.show();
            }
        }

        // If the latest response from the service was an sweet plugin,
        // pass the object here.
        if(data.upToDatePlugins) {
            upToDatePluginsHtml = Mustache.to_html(upToDatePluginsTmpl, data);
            upToDatePluginsBody.append(upToDatePluginsHtml);
            // If this section is already visible, do not
            // bother to call show and save some repainting.
            if(!upToDatePluginsSection + ':visible') {
                upToDatePluginsSection.show();
            }
        }
    },
    unknownPluginUrl = function (pluginName) {
        return Pfs_internal[18] + encodeURI(Pfs_internal[19] + " " + pluginName);
    },
    buildObject = function(data) {
        var plugin = data.pluginInfo.raw,
            url = data.url,
            currentPlugin = {};

            console.log(data.pluginInfo);

        if(data.status === 'should_disable' || data.status === 'vulnerable' ||
            data.status === 'maybe_vulnerable') {
            currentPlugin['vulnerablePlugins'] = {
                'icon': 'default.png',
                'plugin_name': plugin.name,
                'plugin_detail': plugin.description,
                'plugin_status': 'vulnerable',
                'url': url
            };
        } else if(data.status === 'outdated' || data.status === 'maybe_outdated') {
            currentPlugin['outdatedPlugins'] = {
                'icon': 'default.png',
                'plugin_name': plugin.name,
                'plugin_detail': plugin.description,
                'plugin_status': 'vulnerable',
                'url': url
            };
        } else if(data.status === 'unknown') {
            currentPlugin['unknownPlugins'] = {
                'icon': 'default.png',
                'plugin_name': plugin.name,
                'plugin_detail': plugin.description,
                'plugin_status': 'unknown',
                'url': unknownPluginUrl(plugin.name)
            };
        } else if(data.status === 'latest' || data.status === 'newer') {
            currentPlugin['upToDatePlugins'] = {
                'icon': 'default.png',
                'plugin_name': plugin.name,
                'plugin_detail': plugin.description,
                'plugin_status': plugin.version,
                'url': url
            };
        }
        showPlugin(currentPlugin);
    },
    pluginCheckComplete = function() {
        var pfsStatus = $('#pfs-status');
        pfsStatus.empty();
    };

    checkPlugins('https://plugins.mozilla.org/pfs/v2', buildObject, pluginCheckComplete);
});