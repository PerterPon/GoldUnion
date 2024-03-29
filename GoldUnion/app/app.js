﻿Ext.application({
    name: 'Sencha',

    launch: function() {
        Ext.Viewport.add({
            xtype: 'tabpanel',
            fullscreen: true,
            tabBarPosition: 'bottom',

            items: [
                {
                    xtype: 'nestedlist',
                    title: '任务列表',
                    iconCls: 'star',
                    cls: 'blog',
                    displayField: 'title',
                    toolbar : {
                        xtype : 'toolbar',
                        layout : 'hbox',
                        items  : [{
                            xtype : 'button',
                            text : '发布任务',
                            right : '0px',
                            top : '12%',
                            height : '60%',
                            listeners : {
                                tap : function(){
                                    var container = Ext.create( 'Ext.Container', {
                                        zindex : 9999,
                                        centered : true,
                                        html : 'this is mask'
                                    } );
                                }
                            }
                        }]
                    },
                    store: {
                        type: 'tree',

                        fields: ['title', 'link', 'author', 'contentSnippet', 'content', {
                            name: 'leaf',
                            defaultValue: true
                        }],

                        root: {
                            leaf: false
                        },

                        proxy: {
                            type: 'ajax',
                            url : '../../backend/test.php',
                            // url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://feeds.feedburner.com/SenchaBlog',
                            reader: {
                                type: 'json',
                                rootProperty: 'responseData.feed.entries'
                            }
                        }
                    },

                    detailCard: {
                        xtype: 'panel',
                        scrollable: true,
                        styleHtmlContent: true
                    },

                    listeners: {
                        itemtap: function(nestedList, list, index, element, post) {
                            this.getDetailCard().setHtml(post.get('content'));
                        }
                    }
                },

                {
                    xtype: 'panel',
                    title: '我的任务',
                    iconCls: 'home',
                    cls: 'home'
                },
            ]
        });
    }
});
