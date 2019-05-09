---
title: Leaflet Jekyll plugin
layout: post
date: 2014-08-18 11:59:46
tags: [projects maps]
---

## Jekyll plugin for easily embedding Leaflet.js maps


### examples:

{% assign bbox = 53.78522001712094,-9.27685546875,58.74041594616937,1.85009765625 %}

{% leaflet_map %}
node
  [amenity=monastery]
  ({{bbox}});
out;
{% endleaflet_map%}

{% leaflet_map %}
node
  [historic=monastery]
  ({{bbox}});
out;
{% endleaflet_map%}

### even better

- embed a series of maps, an "atlas", from a single liquid tag, with different bounding boxes, as specific in a config file.
- generate posts from overpass query and plugin config file
