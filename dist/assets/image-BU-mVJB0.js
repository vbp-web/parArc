const r=(r,t=1200)=>{if(!r)return"";if(!r.includes("imagekit.io"))return r;if(r.includes("tr="))return r;const e=r.includes("?")?"&":"?";return`${r}${e}tr=w-${t},q-80,f-auto`};export{r as g};
