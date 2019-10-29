// 获取用户ip
export function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
  //compatibility for firefox and chrome
  var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  var pc = new myPeerConnection({
    iceServers: []
  }),
  noop = function() {},
  localIPs = {},
  ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g

  function iterateIP(ip) {
    if (!localIPs[ip]) onNewIP(ip)
    localIPs[ip] = true
  }
  //create a bogus data channel
  pc.createDataChannel("")
  // create offer and set local description
  try{
    pc.createOffer(function(sdp) {
      sdp.sdp.split('\n').forEach(function(line) {
        if (line.indexOf('candidate') < 0) return
        line.match(ipRegex).forEach(iterateIP)
      })
      
      pc.setLocalDescription(sdp, noop, noop)
    },function(sdp){
      console.log('fail')
    })
  } catch (err) {
    console.log(err)
  }
  //listen for candidate events
  pc.onicecandidate = function(ice) {
    if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP)
  };
}

getUserIP(ip => {
    console.log(ip);
})