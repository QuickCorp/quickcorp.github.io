'use strict';

Package('org.quickcorp.qcobjects.api.client_services', [
  Class('QuickCorpCloud', JSONService, {
    name: 'quickcorp_cloud',
    external: true,
    cached: false,
    method: 'post',
    basePath: '',
    url: '',
    withCredentials: false,
    _new_: function(o) {
      // service instantiated
      this.headers['Authorization'] = `Basic token`;
      this.basePath = `${CONFIG.get('quickcorp_cloud_domain')}`;
      this.url = `${this.basePath}signup`;
      this.data = o.data;
    },
    done(standardResponse){}
  }),
  Class('AtomShopifyService', JSONService, {
    name: 'atomshopify',
    external: true,
    cached: false,
    method: 'get',
    basePath: '',
    url: '',
    withCredentials: false,
    _new_: function(o) {
      // service instantiated
      this.basePath = `${CONFIG.get('quickcorp_cloud_domain')}`;
      this.url = `${this.basePath}${CONFIG.get('atomshopify_url')}`;
      this.data = o.data;
    },
    done(standardResponse){}
  })
]);
