---
title: map of monasteries
layout: post
date: 2019-08-18 11:59:46
tags: [maps]
leaflet: true
---

## map of monasteries

Overpass API request examples:

~~~
node
  [amenity=monastery]
  (53.785,-9.27,58.740,1.850);
out;
~~~

~~~
node
  [historic=monastery]
  (53.785,-9.27,58.740,1.850);
out;
~~~

## using tags

{% leaflet zoom=8 %}
[out:json];
node
  [historic=monastery]
  (53.785,-9.27,58.740,1.850);
out;
{% endleaflet %}
