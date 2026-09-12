"use client";

export default function NatureTomorrow({

reward = 20,

}){

return(

<div
className="
rounded-[30px]
bg-gradient-to-r
from-sky-400
to-purple-500
p-8
text-white
shadow-lg
"
>

<h2 className="text-2xl font-bold">

Tomorrow's Hunt

</h2>

<p className="mt-4 text-white/90">

A brand new AI-generated
nature adventure
will unlock tomorrow.

</p>

<div
className="
mt-8
rounded-2xl
bg-white/20
p-4
text-lg
font-semibold
backdrop-blur
"
>

Reward

+{reward} XP

</div>

</div>

);

}