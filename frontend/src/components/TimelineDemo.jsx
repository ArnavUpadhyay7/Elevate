import React from "react";
import { Timeline } from "./ui/timeline";

/* ── Shared image class — slightly desaturated to stay on-brand ── */
const imgCls = "rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full border border-white/[0.05] brightness-90 saturate-75";

export function TimelineDemo() {
  const data = [
    {
      title: "Connect with the Best Coaches",
      content: (
        <div>
          <p className="text-[12.5px] md:text-[13.5px] text-white/45 leading-relaxed mb-6 max-w-lg">
            Browse a curated roster of verified Radiant coaches and find the
            perfect match for your playstyle and goals.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <img src="https://i.pinimg.com/736x/78/85/0f/78850fe7d863e016e9f0103c57ec48a8.jpg" alt="coaches" className={imgCls} />
            <img src="https://i.pinimg.com/736x/f7/88/ef/f788efa81af0dd16c33ebe4fd077c0ea.jpg" alt="coaches" className={imgCls} />
            <img src="https://i.pinimg.com/736x/ca/e2/6e/cae26e773b6e457afc43f0fc9566a8d4.jpg" alt="coaches" className={imgCls} />
            <img src="https://i.pinimg.com/736x/af/14/a0/af14a0368589db40ae1726ab81851503.jpg" alt="coaches" className={imgCls} />
          </div>
        </div>
      ),
    },
    {
      title: "Personalized Coaching Sessions",
      content: (
        <div>
          <p className="text-[12.5px] md:text-[13.5px] text-white/45 leading-relaxed mb-6 max-w-lg">
            Engage in tailored 45-minute sessions designed to address your
            weaknesses, refine your strategies, and sharpen your decision-making.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <img src="https://i.pinimg.com/736x/70/3c/6a/703c6a81760f3984720b203b6cf2a137.jpg" alt="session" className={imgCls} />
            <img src="https://i.pinimg.com/736x/66/28/4c/66284cf0a0b7f39aa0283ebe5340f077.jpg" alt="session" className={imgCls} />
            <img src="https://i.pinimg.com/736x/a9/39/d1/a939d185e0700324200715f7ad3e51df.jpg" alt="session" className={imgCls} />
            <img src="https://i.pinimg.com/736x/f0/11/a8/f011a8418e9bd4743f0bc43070f31233.jpg" alt="session" className={imgCls} />
          </div>
        </div>
      ),
    },
    {
      title: "Achieve Your Goals",
      content: (
        <div>
          <p className="text-[12.5px] md:text-[13.5px] text-white/45 leading-relaxed mb-6 max-w-lg">
            Implement expert guidance, track measurable progress, and climb the
            ranks faster than ever before.
          </p>

          {/* Feature bullets — on-brand red dots, no emojis */}
          <ul className="space-y-2.5 mb-7">
            {[
              "Access to top-tier Valorant coaches worldwide",
              "Personalized strategies to fix your weakest areas",
              "Live VOD review and real-time feedback",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[12.5px] md:text-[13px] text-white/50">
                <div className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[#A01E2E] shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-2 gap-3">
            <img src="https://i.pinimg.com/736x/22/74/3a/22743a02be0452723fa8e7a37c977726.jpg" alt="goals" className={imgCls} />
            <img src="https://i.pinimg.com/736x/a1/51/a8/a151a8b0f5c938686b3b4de41c18a973.jpg" alt="goals" className={imgCls} />
            <img src="https://i.pinimg.com/736x/c3/a0/2e/c3a02e4765f13ed61fc75c398cb02112.jpg" alt="goals" className={imgCls} />
            <img src="https://i.pinimg.com/736x/da/6b/37/da6b375a56a39e7b41639a0e707ea507.jpg" alt="goals" className={imgCls} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}