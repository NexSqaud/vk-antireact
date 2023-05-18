(() => {
    
    console.log("[VK NoReact] Start");
    
    var observeDOM = (function(){
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    
        return function(obj, callback){
            if(!obj || obj.nodeType !== 1) return; 
        
            if(MutationObserver)
            {
                var mutationObserver = new MutationObserver(callback)
                mutationObserver.observe(obj, { childList:true, subtree:true });
                return mutationObserver;
            }
            else if(window.addEventListener)
            {
                obj.addEventListener('DOMNodeInserted', callback, false);
                obj.addEventListener('DOMNodeRemoved', callback, false);
            }
        }
    })()
    
    var historyElement = document.getElementsByClassName("_im_peer_history")[0];
    if(historyElement === undefined)
    {
        console.log("лох");
        return;
    }
    
    observeDOM(historyElement, (e) => {
        e.forEach((record) => {
            if(record.addedNodes.length === 0) return;
            
            record.addedNodes.forEach((node) => {
                if(node.classList && node.classList.contains("_im_mess_reactions"))
                {
                    console.log("[VK NoReact] NO REACTIONS!");
                    node.remove();
                }
                else if(node.nodeName === "#text" && node.parentNode.classList.contains("_im_mess_reactions"))
                {
                    console.log("[VK NoReact] NO REACTIONS!");
                    node.parentNode.remove();
                }
                else if(node.nodeName === "#text" && node.parentNode.classList.contains("im-mess_reactions"))
                {
                    console.log("[VK NoReact] NO REACTIONS!");
                    node.parentNode.getElementsByClassName("_im_mess_reactions")[0].remove();
                }
            });
        });
    });
    
})();