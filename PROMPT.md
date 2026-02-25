@plan.md @activity.md

We are building Hevy Web v2 from scratch in this repo.

First read activity.md to see what was recently accomplished.

Start the dev server locally with npm run dev. If port is taken, try another port.

Open plan.md and choose the single highest priority task where passes is false.

Work on exactly ONE task: implement the change.

After implementing, test that it works:
- If it's a UI component, visually verify it
- If it's functionality, test it manually
- Check for any console errors

Append a dated progress entry to activity.md describing what you changed and what you verified.

Update that task's passes in plan.md from false to true.

Make one git commit for that task only with a clear message.

Do not git init, do not change remotes, do not push.

ONLY WORK ON A SINGLE TASK.

When ALL tasks have passes true, output <promise>COMPLETE</promise>
