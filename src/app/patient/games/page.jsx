import Link from "next/link";
import { getServerSession } from "next-auth";

import {
  Flame,
  Trophy,
  Star,
  Sparkles,
  ArrowRight,
  Clock3,
} from "lucide-react";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import GameProgress from "@/models/GameProgress";

export default async function GamesPage() {

  const session =
    await getServerSession(authOptions);

  await connectDB();

  let profile =
    await GameProgress.findOne({
      userId: session.user.id,
    }).lean();

 if (!profile) {
  profile = {
    xp: 0,
    level: 1,
    streak: 0,
    badges: [],
  };
}
  const currentXP =
    profile.xp % 100;

  const progress =
    currentXP;

  const games = [

    {

      title:
        "Nature Scavenger Hunt",

      icon: "🌿",

      href:
        "/patient/games/nature",

      color:
        "from-emerald-50 to-green-100",

      accent:
        "text-green-700",

      description:
        "Explore nature, discover hidden treasures and build healthy habits every single day.",

      reward:
        "+20 XP",

      difficulty:
        "Easy",

      duration:
        "5 mins",

      available: true,

    },

    {

      title:
        "Wellness Bingo",

      icon: "🎯",

      href:
        "/patient/games/bingo",

      color:
        "from-violet-50 to-fuchsia-100",

      accent:
        "text-purple-700",

      description:
        "Complete simple wellness activities and finish rows to unlock exciting rewards.",

      reward:
        "+25 XP",

      difficulty:
        "Medium",

      duration:
        "10 mins",

      available: true,

    },

  ];

  const upcoming = [

    {

      title:
        "Breathing Journey",

      icon:"🫁",

    },

    {

      title:
        "Memory Garden",

      icon:"🧩",

    },

    {

      title:
        "Gratitude Jar",

      icon:"💜",

    },

    {

      title:
        "Mindful Coloring",

      icon:"🎨",

    },

  ];

  return (

<div className="space-y-10">

{/* Hero */}

<section
className="
relative
overflow-hidden
rounded-[36px]
bg-gradient-to-r
from-sky-400
via-sky-500
to-purple-500
p-8
md:p-12
shadow-2xl
"
>

<div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/10"/>

<div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/10"/>

<div className="relative z-10 max-w-3xl">

<div
className="
inline-flex
items-center
gap-2
rounded-full
bg-white/20
px-4
py-2
text-sm
font-medium
text-white
backdrop-blur
"
>

<Sparkles size={16}/>

Daily Wellness

</div>

<h1
className="
mt-6
text-4xl
font-extrabold
leading-tight
text-white
md:text-6xl
"
>

Play.
Relax.
Grow.

</h1>

<p
className="
mt-5
max-w-2xl
text-lg
leading-8
text-white/90
"
>

Complete fun wellness games,
earn XP,
unlock badges,
maintain your daily streak,
and make self-care enjoyable.

</p>

</div>

</section>

{/* Stats */}

<div
className="
grid
grid-cols-2
gap-5
lg:grid-cols-4
"
>

<div className="rounded-3xl bg-white p-6 shadow-lg">

<Flame
className="text-orange-500"
/>

<p className="mt-4 text-sm text-slate-500">

Current Streak

</p>

<h2 className="mt-2 text-4xl font-bold">

{profile.streak}

</h2>

</div>

<div className="rounded-3xl bg-white p-6 shadow-lg">

<Star
className="text-yellow-500"
/>

<p className="mt-4 text-sm text-slate-500">

Level

</p>

<h2 className="mt-2 text-4xl font-bold">

{profile.level}

</h2>

</div>

<div className="rounded-3xl bg-white p-6 shadow-lg">

<Trophy
className="text-purple-500"
/>

<p className="mt-4 text-sm text-slate-500">

Badges

</p>

<h2 className="mt-2 text-4xl font-bold">

{profile.badges.length}

</h2>

</div>

<div className="rounded-3xl bg-white p-6 shadow-lg">

<Sparkles
className="text-sky-500"
/>

<p className="mt-4 text-sm text-slate-500">

Total XP

</p>

<h2 className="mt-2 text-4xl font-bold">

{profile.xp}

</h2>

</div>

</div>

{/* Progress */}

<div
className="
rounded-[34px]
bg-white
p-8
shadow-xl
"
>

<div
className="
flex
flex-col
justify-between
gap-4
md:flex-row
md:items-center
"
>

<div>

<h2
className="
text-2xl
font-bold
"
>

Level Progress

</h2>

<p className="text-slate-500">

{currentXP}/100 XP to next level

</p>

</div>

<div
className="
rounded-full
bg-sky-100
px-5
py-2
font-semibold
text-sky-700
"
>

Level {profile.level}

</div>

</div>

<div
className="
mt-8
h-5
overflow-hidden
rounded-full
bg-slate-200
"
>

<div

className="
h-full
rounded-full
bg-gradient-to-r
from-sky-400
via-cyan-400
to-purple-500
transition-all
duration-700
"

style={{
width:`${progress}%`
}}

>

</div>

</div>

</div>

      {/* Games */}

      <section className="space-y-6">

        <div className="flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            Today's Games
          </h2>

          <span
            className="
            rounded-full
            bg-green-100
            px-4
            py-2
            text-sm
            font-semibold
            text-green-700
          "
          >
            2 Games Available
          </span>

        </div>

        <div
          className="
          grid
          gap-8
          lg:grid-cols-2
        "
        >

          {games.map((game) => (

            <Link

              key={game.title}

              href={game.href}

              className="
              group
              overflow-hidden
              rounded-[34px]
              bg-white
              shadow-xl
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-2xl
            "
            >

              {/* Header */}

              <div
                className={`
                bg-gradient-to-r
                ${game.color}
                p-8
              `}
              >

                <div className="flex items-center justify-between">

                  <div className="text-6xl">

                    {game.icon}

                  </div>

                  <span
                    className="
                    rounded-full
                    bg-white
                    px-4
                    py-2
                    text-sm
                    font-semibold
                  "
                  >
                    Today's Challenge
                  </span>

                </div>

                <h2
                  className="
                  mt-8
                  text-3xl
                  font-bold
                "
                >

                  {game.title}

                </h2>

              </div>

              {/* Body */}

              <div className="p-8">

                <p
                  className="
                  leading-8
                  text-slate-600
                "
                >
                  {game.description}
                </p>

                {/* Chips */}

                <div
                  className="
                  mt-8
                  flex
                  flex-wrap
                  gap-3
                "
                >

                  <span
                    className="
                    rounded-full
                    bg-sky-100
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-sky-700
                  "
                  >
                    ⭐ {game.reward}
                  </span>

                  <span
                    className="
                    rounded-full
                    bg-purple-100
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-purple-700
                  "
                  >
                    {game.difficulty}
                  </span>

                  <span
                    className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-orange-100
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-orange-700
                  "
                  >

                    <Clock3 size={16}/>

                    {game.duration}

                  </span>

                </div>

                {/* Button */}

                <div
                  className="
                  mt-10
                  flex
                  items-center
                  justify-between
                "
                >

                  <div>

                    <p className="text-sm text-slate-500">

                      Continue your wellness journey

                    </p>

                  </div>

                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    rounded-2xl
                    bg-sky-500
                    px-6
                    py-3
                    font-semibold
                    text-white
                    transition
                    group-hover:bg-purple-500
                  "
                  >

                    Play

                    <ArrowRight
                      size={18}
                    />

                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* Coming Soon */}

      <section className="space-y-6">

        <h2
          className="
          text-3xl
          font-bold
        "
        >
          Coming Soon
        </h2>

        <div
          className="
          grid
          gap-6
          sm:grid-cols-2
          xl:grid-cols-4
        "
        >

          {upcoming.map((game) => (

            <div

              key={game.title}

              className="
              rounded-[30px]
              border-2
              border-dashed
              border-slate-300
              bg-slate-50
              p-8
              text-center
              transition
              hover:border-sky-400
              hover:bg-white
            "
            >

              <div className="text-5xl">

                {game.icon}

              </div>

              <h3
                className="
                mt-6
                text-xl
                font-bold
              "
              >

                {game.title}

              </h3>

              <span
                className="
                mt-6
                inline-block
                rounded-full
                bg-slate-200
                px-4
                py-2
                text-sm
                font-semibold
              "
              >
                Coming Soon
              </span>

            </div>

          ))}

        </div>

      </section>

      {/* Footer */}

      <section
        className="
        rounded-[34px]
        bg-gradient-to-r
        from-sky-400
        via-cyan-400
        to-purple-500
        p-10
        text-center
        text-white
        shadow-xl
      "
      >

        <h2 className="text-3xl font-bold">

          Every small step counts 🌸

        </h2>

        <p
          className="
          mx-auto
          mt-4
          max-w-3xl
          text-lg
          leading-8
          text-white/90
        "
        >

          Complete one game every day,
          maintain your streak,
          unlock beautiful badges,
          and make self-care a daily habit.

        </p>

      </section>

    </div>

  );

}