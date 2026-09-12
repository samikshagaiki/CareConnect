"use client";

import { useEffect, useState } from "react";
import NatureHero from "@/components/games/nature/NatureHero";
import NatureStats from "@/components/games/nature/NatureStats";
import NatureBoard from "@/components/games/nature/NatureBoard";
import NatureTips from "@/components/games/nature/NatureTips";
import NatureBadge from "@/components/games/nature/NatureBadge";
import NatureTomorrow from "@/components/games/nature/NatureTomorrow";
import NatureFooter from "@/components/games/nature/NatureFooter";
import ConfettiCelebration from "@/components/games/common/ConfettiCelebration";
import BadgePopup from "@/components/games/common/BadgePopup";

export default function NatureGamePage() {

  const [challenge, setChallenge] = useState(null);

  const [completedTasks, setCompletedTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showConfetti,setShowConfetti]= useState(false);

const [showBadge,setShowBadge]= useState(false);

const [streak, setStreak] = useState(0);

const [level, setLevel] = useState(1);

const [xp, setXP] = useState(0);

const [badges, setBadges] = useState([]);

  async function fetchChallenge() {

    const response = await fetch("/api/games/nature/today");

    const data = await response.json();

    const today =
  new Date().toISOString().split("T")[0];

if (
  data.success &&
  data.challenge
) {

  setChallenge(data.challenge);

  setCompletedTasks(
    data.progress.today.completedTasks ?? []
  );

  setStreak(
    data.progress.streak
  );

  setLevel(
    data.progress.level
  );

  setXP(
    data.progress.xp
  );

  setBadges(
    data.progress.badges ?? []
  );

}

    setLoading(false);

  }

  useEffect(() => {

    fetchChallenge();

  }, []);

  async function toggleTask(index) {

    let updated;

    if (completedTasks.includes(index)) {

      updated = completedTasks.filter(
        (i) => i !== index
      );

    } else {

      updated = [...completedTasks, index];

    }

    setCompletedTasks(updated);

if(
updated.length===challenge?.tasks?.length ?? 0
){

setShowConfetti(true);

setShowBadge(true);

setTimeout(()=>{

setShowConfetti(false);

},6000);

setTimeout(()=>{

setShowBadge(false);

},3500);

}

   const response =
  await fetch(
    "/api/games/nature/progress",
    {
      method: "PATCH",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        completedTasks: updated,
      }),
    }
  );

const data =
  await response.json();

if (data.success) {

  setXP(data.xp);

  setLevel(data.level);

  setStreak(data.streak);

  setBadges(data.badges);

  if (
  data.badges.length >
  badges.length
) {

  setShowBadge(true);

}

  if (data.justCompleted) {

    setShowConfetti(true);

    setShowBadge(true);

  }

}

  }

  if (
  loading ||
  !challenge
) {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      Loading today's challenge...
    </div>
  );
}


  return (

    <div className="mx-auto max-w-7xl space-y-10 px-4 py-6 sm:px-6 lg:px-8">

        <ConfettiCelebration
show={showConfetti}
/>

<BadgePopup
show={showBadge}
/>

      {/* Hero */}

      <NatureHero

streak={streak}

level={level}

/>



      {/* Progress */}

      <NatureStats
  completed={completedTasks.length}
  total={challenge?.tasks?.length ?? 0}
  streak={streak}
  level={level}
  xp={xp}
  rewardXP={challenge?.rewardXP ?? 0}
/>

      {/* Tasks */}
<NatureBoard
  tasks={
  challenge?.tasks ?? []
}
  completedTasks={completedTasks}
  toggleTask={toggleTask}
/>

<div
  className="
  grid
  gap-6
  lg:grid-cols-3
"
>

  <NatureTips/>

  <NatureBadge
    badge={badges.at(-1)}
/>

  <NatureTomorrow

reward={
  challenge?.rewardXP ?? 0
}

/>

</div>

<NatureFooter/>

    </div>

  );

}