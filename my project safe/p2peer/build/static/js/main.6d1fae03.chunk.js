(this.webpackJsonpp2peer=this.webpackJsonpp2peer||[]).push([[0],{111:function(e,s,n){},112:function(e,s,n){},144:function(e,s){},146:function(e,s){},157:function(e,s){function n(e){var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=157},158:function(e,s,n){},159:function(e,s,n){},160:function(e,s,n){},161:function(e,s,n){},162:function(e,s,n){},166:function(e,s,n){},167:function(e,s,n){},168:function(e,s,n){},169:function(e,s,n){},171:function(e,s,n){"use strict";n.r(s);var t,c,a=n(0),r=n.n(a),i=n(29),o=n.n(i),j=(n(111),n(112),n(103)),l=n(4),u=n(31),d=n(5),m=n(62),b=n(20),_=n.n(b),O=n(39),f=n.n(O),v=n(53),x=n(1),g=v.a.div(t||(t=Object(m.a)(["\n  padding: 20px;\n  display: flex;\n  height: 100vh;\n  width: 90%;\n  margin: auto;\n  flex-wrap: wrap;\n"]))),h=v.a.video(c||(c=Object(m.a)(["\n  height: 40%;\n  width: 50%;\n"]))),p=function(e){var s=Object(a.useRef)();return Object(a.useEffect)((function(){e.peer.on("stream",(function(e){s.current.srcObject=e}))}),[]),Object(x.jsx)(h,{playsInline:!0,autoPlay:!0,ref:s})},N={height:window.innerHeight/2,width:window.innerWidth/2},q=function(e){var s=Object(a.useState)([]),n=Object(d.a)(s,2),t=n[0],c=n[1],r=Object(a.useRef)(),i=Object(a.useRef)(),o=Object(a.useRef)([]),j=e.match.params.roomID;return Object(a.useEffect)((function(){r.current=_.a.connect("/"),navigator.mediaDevices.getUserMedia({video:N,audio:!0}).then((function(e){i.current.srcObject=e,r.current.emit("join room",j),r.current.on("all users",(function(s){var n=[];s.forEach((function(s){var t=function(e,s,n){var t=new f.a({initiator:!0,trickle:!1,stream:n});return t.on("signal",(function(n){r.current.emit("sending signal",{userToSignal:e,callerID:s,signal:n})})),t}(s,r.current.id,e);o.current.push({peerID:s,peer:t}),n.push(t)})),c(n)})),r.current.on("user joined",(function(s){var n=function(e,s,n){var t=new f.a({initiator:!1,trickle:!1,stream:n});return t.on("signal",(function(e){r.current.emit("returning signal",{signal:e,callerID:s})})),t.signal(e),t}(s.signal,s.callerID,e);o.current.push({peerID:s.callerID,peer:n}),c((function(e){return[].concat(Object(u.a)(e),[n])}))})),r.current.on("receiving returned signal",(function(e){o.current.find((function(s){return s.peerID===e.id})).peer.signal(e.signal)}))}))}),[]),Object(x.jsxs)(g,{children:[Object(x.jsx)(h,{muted:!0,ref:i,autoPlay:!0,playsInline:!0}),t.map((function(e,s){return Object(x.jsx)(p,{peer:e},s)}))]})},w=n(54),y=n.n(w);n(158);var I=function(e){var s=e.roomID,n=Object(a.useState)([]),t=Object(d.a)(n,2),c=t[0],r=t[1],i=Object(a.useState)(),o=Object(d.a)(i,2),j=o[0],l=o[1],m=Object(a.useRef)(),b=Object(a.useState)(""),O=Object(d.a)(b,2),f=O[0],v=O[1];return Object(a.useEffect)((function(){m.current=_.a.connect("/"),m.current.emit("joinmsg","msg"+s),m.current.on("receivemsg",(function(e){r((function(s){return[].concat(Object(u.a)(s),[e])}))}))}),[]),Object(x.jsx)("div",{children:Object(x.jsxs)("div",{className:"containermsg",children:[Object(x.jsx)("input",{type:"text",className:"name",onChange:function(e){return v(e.target.value)},value:f}),Object(x.jsx)("div",{className:"box",children:c.map((function(e,s){return Object(x.jsx)("p",{children:e},s)}))}),Object(x.jsxs)("div",{className:"msging",children:[Object(x.jsx)("input",{type:"text",onChange:function(e){return l(e.target.value)},className:"msg",value:j}),Object(x.jsx)("button",{onClick:function(){r((function(e){return[].concat(Object(u.a)(e),["me: "+j])})),l(""),m.current.emit("sendingmsg",f+": "+j)},children:"send"})]})]})})},D=(n(159),function(e){var s=Object(a.useState)(!1),n=Object(d.a)(s,2),t=n[0],c=n[1],r=Object(a.useRef)(),i=Object(a.useRef)(),o=Object(a.useRef)(),j=Object(a.useState)(!1),l=Object(d.a)(j,2),u=l[0],m=l[1],b=e.match.params.roomID,O=Object(a.useState)(),f=Object(d.a)(O,2),v=f[0],g=f[1],h=Object(a.useState)(),p=Object(d.a)(h,2),N=p[0],q=p[1],w={},D=Object(a.useState)(),k=Object(d.a)(D,2),S=k[0],C=k[1],E=new y.a(void 0,{host:"/",port:"9000"});function R(e,s){e.srcObject=s,e.addEventListener("loadedmetadata",(function(){e.play()}))}function M(){navigator.mediaDevices.getDisplayMedia({video:{cursor:"always"},audio:!0}).then((function(e){var s=e.getVideoTracks()[0];i.current.srcObject=e,s.onended=function(){!function(){var e=N.getVideoTracks()[0];i.current.srcObject=N,v.getSenders().find((function(s){return s.track.kind==e.kind})).replaceTrack(e)}()},v.getSenders().find((function(e){return e.track.kind==s.kind})).replaceTrack(s)}))}return Object(a.useEffect)((function(){r.current=_.a.connect("/"),u&&(i.current.muted=!0),navigator.mediaDevices.getUserMedia({video:{torch:!0},audio:{echoCancellation:!0,noiseSuppression:!0}}).then((function(e){q(e),console.log(e),g(e),u&&R(i.current,e),E.on("call",(function(s){s.answer(e),s.on("stream",(function(e){R(o.current,e),g(s.peerConnection),c(!0)}))})),r.current.on("userconnected",(function(s){!function(e,s){var n=E.call(e,s);n.on("stream",(function(e){R(o.current,e),g(n.peerConnection),c(!0)})),n.on("close",(function(){o.current.srcObject=null})),w[e]=n}(s.id,e)})),r.current.on("userdisconnected",(function(e){w[e]&&w[e].close(),o.current.srcObject=null}))})),u&&E.on("open",(function(e){r.current.emit("joinroom",{roomID:b,id:e,sname:"wissem"})}))}),[u]),Object(x.jsxs)("div",{children:[Object(x.jsxs)("div",{className:"container",children:[Object(x.jsxs)("div",{className:"streaming",children:[u&&Object(x.jsx)("video",{className:"prof",ref:"prof"===S?i:o}),Object(x.jsx)("video",{className:"etud",ref:"prof"===S?o:i})]}),Object(x.jsx)("div",{className:"chatting",children:Object(x.jsx)(I,{roomID:b})})]}),t&&Object(x.jsx)("button",{className:"share",onClick:function(){M()},children:"sharemyscrean"}),Object(x.jsx)("input",{type:"text",onChange:function(e){C(e.target.value)},className:"who"}),!u&&S&&Object(x.jsx)("button",{type:"button",onClick:function(){return m(!0)},children:"JOIN"})]})});n(160);var k=function(){var e=Object(a.useRef)(),s=Object(a.useRef)(),n=Object(a.useState)([]),t=Object(d.a)(n,2),c=t[0],r=t[1],i=Object(a.useRef)(),o=Object(a.useRef)([]),j={height:window.innerHeight/2,width:window.innerWidth/2};return Object(a.useEffect)((function(){i.current=_.a.connect("/"),navigator.mediaDevices.getUserMedia({video:j,audio:!0}).then((function(s){e.current.srcObject=s,i.current.emit("join"),i.current.on("partner",(function(e){var n=function(e,s,n){var t=new f.a({initiator:!0,trickle:!1,stream:n});return t.on("signal",(function(n){i.current.emit("sending signal",{userToSignal:e,callerID:s,signal:n})})),t}(e,i.current.id,s);o.current.push({peerID:e,peer:n}),c.push(n),r(c)})),i.current.on("user joined",(function(e){var n=function(e,s,n){var t=new f.a({initiator:!1,trickle:!1,stream:n});return t.on("signal",(function(e){i.current.emit("returning signal",{signal:e,callerID:s})})),t.signal(e),t}(e.signal,e.callerID,s);o.current.push({peerID:e.callerID,peer:n}),r((function(e){return[].concat(Object(u.a)(e),[n])}))})),i.current.on("receiving returned signal",(function(e){o.current.find((function(s){return s.peerID===e.id})).peer.signal(e.signal)}))}))}),[]),Object(x.jsxs)("div",{className:"container",children:[Object(x.jsx)("video",{className:"uservideo",playsInline:!0,autoPlay:!0,ref:e}),Object(x.jsx)("video",{className:"partnervideo",playsInline:!0,autoPlay:!0,ref:s})]})};var S=function(e){var s=Object(a.useRef)(),n=Object(a.useRef)(),t=e.match.params.roomID,c=[],r=new y.a(void 0,{host:"/",port:"9000"});return Object(a.useEffect)((function(){n.current=_.a.connect("/"),navigator.mediaDevices.getUserMedia({video:{torch:!0},audio:{echoCancellation:!0,noiseSuppression:!0}}).then((function(e){var s=document.createElement("video");s.srcObject=e,s.muted=!0,document.getElementById("users").appendChild(s),s.play(),r.on("call",(function(s){s.answer(e),s.on("stream",(function(e){if(!c.includes(s.peer)){var n=document.createElement("video");n.srcObject=e,document.getElementById("users").appendChild(n),n.play(),c.push(s.peer)}}))})),n.current.on("newuser",(function(s){!function(e,s){var n=r.call(e,s);n.on("stream",(function(e){if(!c.includes(n.peer)){var s=document.createElement("video");s.srcObject=e,document.getElementById("users").appendChild(s),s.play(),c.push(n.peer)}}))}(s,e)}))})),r.on("open",(function(e){n.current.emit("joinothers",{roomid:t,id:e})}))}),[]),Object(x.jsx)("div",{children:Object(x.jsxs)("div",{className:"container",children:[Object(x.jsx)("video",{src:"",ref:s}),Object(x.jsx)("div",{id:"users"})]})})},C=n(97),E=n.n(C),R=n(92),M=n.n(R),P=n(98),T=n.n(P),L=n(56),F=n.n(L),U=n(99),B=n.n(U),W=n(100),H=n.n(W),J=n(101),V=n.n(J);n(161);var z=function(e){var s=e.show;return Object(x.jsx)("div",{children:Object(x.jsxs)("div",{className:"minilogin__form",style:{display:s?"flex":"none",marginLeft:s?"-20vw":"20vw"},children:[Object(x.jsx)("input",{placeholder:"Email",type:"text"}),Object(x.jsx)("input",{placeholder:"Password",type:"text"}),Object(x.jsx)("button",{className:"minilogin__button",children:"Login"}),Object(x.jsx)("div",{className:"minilogin__message",children:"*error holder"})]})})};n(162);var A=function(e){var s=e.SetChangepage,n=Object(a.useState)(!1),t=Object(d.a)(n,2),c=t[0],r=t[1],i=Object(a.useState)(!1),o=Object(d.a)(i,2),j=o[0],l=o[1],u=Object(a.useState)(!0),m=Object(d.a)(u,2),b=m[0];return m[1],Object(x.jsx)("div",{children:Object(x.jsxs)("div",{className:"navbar__container",children:[Object(x.jsxs)("div",{className:"navbar__left",children:[Object(x.jsx)("img",{src:"https://png.pngtree.com/element_our/png/20181011/linkedin-social-media-icon-design-template-vector-png_127000.jpg",alt:"icon",style:{width:"50px",height:"50px",objectFit:"fill"}}),Object(x.jsxs)("div",{className:"navbar__search",children:[Object(x.jsx)(M.a,{}),Object(x.jsx)("input",{type:"text",placeHolder:"search"})]})]}),Object(x.jsxs)("div",{className:"navbar__right",onMouseLeave:function(){!b&&r(!1),b&&l(!1)},children:[Object(x.jsxs)("div",{className:"navbar__tabs",children:[Object(x.jsxs)("div",{className:"nav__tab",onClick:function(){return s("home")},children:[Object(x.jsx)(E.a,{}),Object(x.jsx)("div",{children:"Home"})]}),Object(x.jsxs)("div",{className:"nav__tab",onClick:function(){return s("rooms")},children:[Object(x.jsx)(F.a,{}),Object(x.jsx)("div",{children:"Rooms"})]}),Object(x.jsxs)("div",{className:"nav__tab",onClick:function(){return s("messages")},children:[Object(x.jsx)(T.a,{}),Object(x.jsx)("div",{children:"Messages"})]}),Object(x.jsxs)("div",{className:"nav__tab",onClick:function(){return s("schedule")},children:[Object(x.jsx)(B.a,{}),Object(x.jsx)("div",{children:"Schedule"})]})]}),Object(x.jsx)("div",{className:"navbar__divider"}),Object(x.jsxs)("div",{className:"navbar__myaccount",onMouseEnter:function(){!b&&r(!0),b&&l(!0)},children:[b?"Wissem Rouabeh":"Sign in",Object(x.jsx)(H.a,{}),Object(x.jsx)(z,{show:c}),Object(x.jsxs)("div",{className:"navbar__coins",style:{display:j?"block":"none"},children:["150",Object(x.jsx)(V.a,{})]})]})]})]})})};n(166),n(167);var G=n(189);var K=function(){return Object(x.jsx)("div",{children:Object(x.jsxs)("div",{className:"message__card",children:[Object(x.jsx)("div",{className:"message__card__avatar",children:Object(x.jsx)(G.a,{})}),Object(x.jsxs)("div",{className:"message__card__body",children:[Object(x.jsx)("div",{className:"message__name",children:"Wissem Rouabeh "}),Object(x.jsx)("div",{className:"message__text",children:"Lorem ipsum dolor sit amet con"})]}),Object(x.jsx)("div",{className:"message__card__divider"})]})})},Q=n(102),X=n.n(Q);n(168);var Y=function(){return Object(x.jsx)("div",{children:Object(x.jsxs)("div",{className:"messenger__container",children:[Object(x.jsxs)("div",{className:"messenger__header",children:[Object(x.jsx)(G.a,{}),Object(x.jsx)("div",{className:"messenger__header__name",children:"Wissem Rouabeh"}),Object(x.jsxs)("div",{className:"messenger__make_room",children:["Make",Object(x.jsx)(F.a,{})]})]}),Object(x.jsxs)("div",{className:"messenger__messages",children:["q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q",Object(x.jsx)("div",{className:"messenger_focus_on_last"}),"q"]}),Object(x.jsxs)("div",{className:"messenger__footer",children:[Object(x.jsx)("input",{type:"text"}),Object(x.jsx)(X.a,{className:"messenger__footer__button"})]})]})})};var Z=function(){return Object(x.jsx)("div",{children:Object(x.jsxs)("div",{className:"messages__container",children:[Object(x.jsxs)("div",{className:"messages__sidebar",children:[Object(x.jsx)(K,{}),Object(x.jsx)(K,{}),Object(x.jsx)(K,{}),Object(x.jsx)(K,{}),Object(x.jsx)(K,{}),Object(x.jsx)(K,{}),Object(x.jsx)(K,{}),Object(x.jsx)(K,{})]}),Object(x.jsx)("div",{className:"messages__messages",children:Object(x.jsx)(Y,{})})]})})};var $=function(){var e=Object(a.useState)("home"),s=Object(d.a)(e,2),n=s[0],t=s[1];return Object(x.jsxs)("div",{children:[Object(x.jsx)(A,{SetChangepage:t}),Object(x.jsx)("div",{className:"accueil__body",children:function(){switch(n){case"messages":return Object(x.jsx)(Z,{})}}()})]})},ee=n(188);n(169);var se=function(){return Object(x.jsx)("div",{children:Object(x.jsxs)("div",{className:"login__container",children:[Object(x.jsxs)("div",{className:"login__form",children:[Object(x.jsx)("div",{className:"login__email__text",children:"Email address"}),Object(x.jsx)("input",{type:"text",className:"login__email__input"}),Object(x.jsxs)("div",{className:"login__password__text",children:["Password",Object(x.jsx)("small",{className:"login__forgot__text",children:"Forgot password?"})]}),Object(x.jsx)("input",{type:"Password",className:"login__password__input"}),Object(x.jsx)("div",{className:"login__button__section",children:Object(x.jsx)(ee.a,{variant:"contained",className:"login__button",color:"primary",children:"Sign in"})})]}),Object(x.jsxs)("div",{className:"login__signup",children:["New to platform?"," ",Object(x.jsx)("small",{className:"login__signup__create",children:"Create an account"})]})]})})};var ne=function(){return Object(x.jsx)(j.a,{children:Object(x.jsxs)(l.c,{children:[Object(x.jsx)(l.a,{path:"/room/:roomID",component:q}),Object(x.jsx)(l.a,{path:"/chat/:roomID",component:D}),Object(x.jsx)(l.a,{path:"/oneton/:roomID",component:S}),Object(x.jsx)(l.a,{path:"/chatting",component:k}),Object(x.jsx)(l.a,{path:"/accueil",component:$}),Object(x.jsx)(l.a,{path:"/login",component:se})]})})},te=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,190)).then((function(s){var n=s.getCLS,t=s.getFID,c=s.getFCP,a=s.getLCP,r=s.getTTFB;n(e),t(e),c(e),a(e),r(e)}))};o.a.render(Object(x.jsx)(r.a.StrictMode,{children:Object(x.jsx)(ne,{})}),document.getElementById("root")),te()}},[[171,1,2]]]);
//# sourceMappingURL=main.6d1fae03.chunk.js.map