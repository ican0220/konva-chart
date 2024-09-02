
export const barColors = {
  color1: "rgb(240,146,146)",
  color2: "rgb(252,241,144)",
  color3: "rgb(93,173,238)",
  color4: "rgb(131,255,151)",
  
};

const currentYear = (new Date()).getFullYear();
export const series = [
  { label: (currentYear-3).toString(), color: barColors.color1 },
  { label: (currentYear-2).toString(), color: barColors.color2 },
  { label: (currentYear-1).toString(), color: barColors.color3 },
  { label: (currentYear-0).toString(), color: barColors.color4 },
];

export const ENV_VARS = {
  server_url: process.env.SERVER_URL ? process.env.SERVER_URL: 'http://localhost:3000'
}
