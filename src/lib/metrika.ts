export const METRIKA_COUNTER_ID = 102322325;

export const reachGoal = (goal: string, params?: Record<string, unknown>) => {
  window.ym?.(METRIKA_COUNTER_ID, "reachGoal", goal, params);
};
