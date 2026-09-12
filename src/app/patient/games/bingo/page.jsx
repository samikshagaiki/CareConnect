"use client";

import { useEffect, useState, useCallback } from "react";

import BingoHero from "@/components/games/bingo/BingoHero";
import BingoStats from "@/components/games/bingo/BingoStats";
import BingoBoard from "@/components/games/bingo/BingoBoard";
import BingoBadge from "@/components/games/bingo/BingoBadge";
import BingoTomorrow from "@/components/games/bingo/BingoTomorrow";
import BingoFooter from "@/components/games/bingo/BingoFooter";

import ConfettiCelebration from "@/components/games/common/ConfettiCelebration";
import BadgePopup from "@/components/games/common/BadgePopup";

export default function BingoPage() {

  const [challenge,setChallenge] =
    useState(null);

  const [checked,setChecked] =
    useState([]);

  const [loading,setLoading] =
    useState(true);

  const [showConfetti,setShowConfetti] =
    useState(false);

  const [showBadge,setShowBadge] =
    useState(false);

  const [streak,setStreak] =
    useState(0);

  const [level,setLevel] =
    useState(1);

  const [xp,setXP] =
    useState(0);

  const [badges,setBadges] =
    useState([]);

  const [rowsCompleted,setRowsCompleted] =
    useState(0);

  const [completedToday,setCompletedToday] =
    useState(false);

  const fetchToday = useCallback(async () => {
    try {
      const response = await fetch("/api/games/bingo/today");
      const data = await response.json();

      if (data.success) {
        setChallenge(data.challenge);
        setChecked(data.progress.today.checkedCells ?? []);
        setStreak(data.progress.streak);
        setLevel(data.progress.level);
        setXP(data.progress.xp);
        setBadges(data.progress.badges ?? []);
        setRowsCompleted(data.progress.today.rowsCompleted ?? 0);
        setCompletedToday(data.progress.today.completed ?? false);
      }
    } catch (e) {
      console.error("Failed to load today's bingo:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchToday();
  }, [fetchToday]);

  async function toggle(index){

    if(completedToday)
      return;

    let updated;

    if(
      checked.includes(index)
    ){

      updated =
        checked.filter(
          i=>i!==index
        );

    }

    else{

      updated =
        [...checked,index];

    }

    setChecked(updated);

    const response =
      await fetch(
        "/api/games/bingo/progress",
        {

          method:"PATCH",

          headers:{
            "Content-Type":
            "application/json"
          },

          body:JSON.stringify({

            checkedCells:
            updated

          })

        }
      );

    const data =
      await response.json();

    if(data.success){

      setXP(data.xp);

      setLevel(data.level);

      setStreak(data.streak);

      setRowsCompleted(
        data.rowsCompleted
      );

      setBadges(
        data.badges
      );

      setCompletedToday(
        data.completed
      );

      if(
        data.justCompleted
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

    }

  }

  if(
    loading ||
    !challenge
  ){

    return(

      <div
        className="
        flex
        h-[70vh]
        items-center
        justify-center
        text-xl
        font-semibold
      "
      >

        Loading today's Bingo...

      </div>

    );

  }

  return(

    <div
      className="
      mx-auto
      max-w-7xl
      space-y-10
      px-4
      py-6
      sm:px-6
      lg:px-8
    "
    >

      <ConfettiCelebration
        show={showConfetti}
      />

      <BadgePopup
        show={showBadge}
      />

      <BingoHero

        streak={streak}

        level={level}

        xp={xp}

        reward={
          challenge.rewardXP
        }

        rowsCompleted={
          rowsCompleted
        }

      />

      <BingoStats

        completed={
          checked.length
        }

        total={
          challenge.cells.length
        }

        streak={streak}

        level={level}

        xp={xp}

        reward={
          challenge.rewardXP
        }

        rowsCompleted={
          rowsCompleted
        }

      />

      <BingoBoard

        tasks={
          challenge.cells
        }

        checked={checked}

        toggle={toggle}

        disabled={
          completedToday
        }

      />

      <div
className="
grid
gap-6
md:grid-cols-2
"
>

<BingoBadge
badge={badges.at(-1)}
/>

<BingoTomorrow
reward={challenge.rewardXP}
/>

</div>

      <BingoFooter/>

    </div>

  );

}