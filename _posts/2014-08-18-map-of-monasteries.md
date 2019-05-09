---
title: map of monasteries
layout: post
date: 2014-08-18 11:59:46
tags: [maps]
---

## map of monasteries



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
