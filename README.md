## wikidata family tree

playing around with (messy) ancestry data on wikidata

### get a list of parent-child relationships

https://query.wikidata.org/

```
select ?person ?parent where {
  ?parent wdt:P31 wd:Q5;
          wdt:P40 ?person.
}
```

download as `raw.json`

### massage the data

node `generate-tree.js`

### display an ancestry

Run `node script.js` with a single argument representing a wikidata entry (i.e. https://www.wikidata.org/wiki/Q2263)

```
$ node script.js Q2263
1. Tom Hanks (1956 - ?)
2. Amos Mefford Hanks (1923 - 1991)
3. Ernest Buel Hanks (1889 - 1934)
4. Daniel Boone Hanks (1846 - 1920)
5. Thomas Hanks (? - ?)
6. Sarah Tandy (1790 - 1861)
7. John Tandy (1750 - 1815)
8. Jane Quarles (? - ?)
9. Moses Quarles (1703 - ?)
10. Jane Mallory (? - ?)
11. Capt. Roger Mallory (1636 - 1694)
12. Thomas Mallory (? - ?)
13. Thomas Mallory (? - ?)
14. Sir William Mallory, of Studley (? - ?)
15. Sir William Mallory, of Studley (? - ?)
16. Sir John Mallory, of Studley (? - ?)
17. Joan Constable, of Halsham (? - ?)
18. Laura|Lora FitzHugh (? - ?)
19. William FitzHugh, 4th Baron FitzHugh (? - 1452)
20. Elizabeth Grey (? - ?)
21. Sir Robert Grey (? - ?)
22. Avice Marmion (? - ?)
23. Maud de Furnivalle (? - ?)
24. Joan de Verdun (? - 1334)
25. Maud de Mortimer (? - ?)
26. Margaret Mortimer, Baroness Mortimer (? - 1333)
27. Blanche of Brienne (? - ?)
28. Jeanne, Dame de Chateaudun (? - ?)
29. Clémence des Roches (? - ?)
30. Marguerite de Sablé (? - ?)
31. Clémence de Mayenne (? - ?)
32. Geoffroy III de Mayenne (1134 - 1169)
33. Clemence de Ponthieu (? - ?)
34. William III, Count of Ponthieu (1094 - 1171)
35. Agnes, Countess of Ponthieu (? - ?)
36. Guy I, Count of Ponthieu (1099 - 1100)
37. Hugh II, Count of Ponthieu (999 - 1051)
38. Adelina of Holland (989 - 1039)
39. Lutgardis of Luxemburg (? - 1005)
40. Hedwig of Nordgau (921 - 992)
41. Eberhard IV of Nordgau (? - 973)
42. Hug I de Nordgau (? - 939)
43. Eberhard III van de Nordgau (? - ?)
44. Eberhard II Wichmann (? - ?)
45. Meginhard I von Hamelant (? - ?)
46. Adelaide of Paris (849 - 901)
47. Adalard of Paris (829 - 890)
48. Q4448472 (? - ?)
49. Beggo, Count of Toulouse (759 - 816)
50. (Rotrude) (? - ?)
51. Pepin I of Aquitaine (796 - 838)
52. Louis the Pious (778 - 840)
53. Hildegard of Vinzgouw (757 - 783)
54. Emma of Alamannia (? - ?)
55. Hnabi (? - ?)
56. Huoching (? - 743)
57. Oda von Bayern (? - ?)
58. Theodo II of Bavaria (624 - 716)
59. Agilolf von Bayern (? - ?)
60. Geila von Friaul (? - ?)
61. Gisulf II of Friuli (599 - 610)
62. Gisulf I of Friuli (599 - 580)
63. Grasulf I of Friuli (? - 589)
64. Rodelinda (? - ?)
65. Amalaberga (? - 539)
66. Amalafrida (459 - 525)
67. Theodemir (499 - 473)
68. Vandalarius (? - 458)
69. Vinitharius (? - ?)
70. Q12274488 (? - ?)
71. Q20046254 (? - ?)
72. Achiulfo (269 - ?)
73. Q12079601 (? - ?)
74. Q12168019 (? - ?)
75. Ostrogota (? - ?)
76. Q20045829 (? - ?)
77. Amal (? - ?)
78. Augis (? - ?)
79. Q20045834 (? - ?)
```
