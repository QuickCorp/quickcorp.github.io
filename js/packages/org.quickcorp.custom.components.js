'use strict';
Package('org.quickcorp.custom.components',[
  Class('BlogCardComponent',Component,{
    name:'blogcard',
    cached:true,
    controller:null,
    view:null,
    data:{},
    _new_:function (o){
      _super_('Component','_new_').call(this,o);
    }
  }),
  Class('CardComponent',Component,{
    name:'card',
    cached:false,
    controller:null,
    view:null,
    data:{},
    _new_:function (o){
      _super_('Component','_new_').call(this,o);
    }
  }),
  Class('GridProductsComponent',Component,{
    name:'main',
    cached:false,
    controller:null,
    view:null,
    data:[],
    _new_:function (o){
      o.data = [
        {
          title:'SaverTicket',
          description:'SaverTicket designs sophisticated software for the payment and e-Commerce industry. ',
          logo:'logo_saverticket.png',
          link:'https://saverticket.com'
        },
        {
          title:'Megamarca',
          description:'A marketplace for clothes shopping',
          logo:'logo_megamarca.png',
          link:'https://megamarca.net'
        },
        {
          title:'Take a Wine',
          description: 'A marketplace for e-Winery distributors',
          logo:'logo_winerp.png',
          link:'http://takeawine.com'
        },
        {
          title:'Kiwimoney Online',
          description: 'Money Exchange and Payment solutions information blog',
          logo:'logo_kiwimoney.png',
          link: 'https://kiwimoney.online'
        },
        {
          title:'Atolon',
          description: 'A platform with a powerful admin panel to manage microservices workflows',
          logo:'logo_atolon.png',
          link: 'https://atolonsoftware.com'
        },
        {
          title:'English Autodidactas',
          description: 'English collaborative learning platform for foreigners',
          logo:'logo_englishautodidactas.png',
          link:'https://englishautodidactas.com'
        },
        {
          title:'QCObjects',
          description: 'A powerful framework designed to code fancy in a professional environment',
          logo:'logo_qcobjects.png',
          link: 'https://qcobjects.dev'
        },
        {
          title:'InfoClinic',
          description: 'A health information platform to connect medical centers and professionals',
          logo: 'logo_infoclinic.png',
          link: 'https://infoclinic.cl'
        },
        {
          title:'Chile Summit',
          description: 'A blog with chilean summit and financial information',
          logo: 'logo_chilesummit.png',
          link:'https://chilesummit.cl'
        }
      ];
      _super_('Component','_new_').call(this,o);
    }
  }),
  Class('FooterComponent',Component,{
    name:'footer',
    cached:false,
    _new_:function (o){
      var decoded_email = _Crypt.decrypt('w5XDk8OTw5DCqcOdw5rDlsOEw5TDj8OUw5/DkcKXw4/DkQ==','email');
      o.data = {
        email:decoded_email,
        emaillink:'mailto:'+decoded_email
      };
      _super_('Component','_new_').call(this,o);
    }
  }),
  Class('BlogComponent',Component,{
    name:'blog',
    cached:true,
    serviceClass:'AtomShopifyService'
  })
]);
