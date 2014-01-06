[
 { matches: ['hello', 'fire', 'the', 'bricks'],
   answers: [5, 4, 3, 6, 0, 10 ]
 },
 { multiple: 'Name the liferay plugin-types!',
   answers: ['portlets','themes','layout templates','web modules','hooks','ext plugins','containers','services','pluggers','connectors'],
   good: 6
 },
 { single: 'In which version introduced Liferay the idea of hot-deployable plugins?',
   answers: ['4.3.0', '2.6.1', '5.2', '6.0', '3.2.0']
 },
 { single: 'From which version Ext plugins are not supported?',
   answers: ['6.0', '4.3.0', '2.6.1', '5.2', '3.2.0']
 },
 { short: 'Name the environment with which you can develeop hot-deployable plugins for Liferay!',
   answers : [ 'plugin[s]{0,1}[ ]*sdk']
 },
 { short: 'Name the jar of portal API!',
   answers : [ 'portal-service.*']
 },
 { short: "Name the jar of portal API's implementation!",
   answers : [ 'portal-impl.*']
 },
 { short: "To force portlets to rely completely on the Portal’s API, portlets may only import " + 
          "classes from JARs which are contained in the portlet’s folder:",
   answers: [ 'WEB-INF/lib' ]
 }
 
]
