import axios from "./API";

const get = async (path) => {
  try {
    const response = await axios.get(path);
    return response.data;
  } catch (err) {
    console.error("Error getting data", err);
  }
};

const post = async (path, data) => {
  try {
    const response = await axios.post(path, data);
    return response.data;
  } catch (err) {
    console.error("Error sending data", err);
  }
};

export const C2WAPIService = {
  // Get Request

  getProviders: async () => {
    return await get("/api/providers");
  },
  getGames: async () => {
    return await get("/api/games");
  },
  getliveGames: async () => {
    return await get("/api/liveGames");
  },
  getWithdrawals: async () => {
    return await get("/api/withdrawals");
  },
  getCashFlow: async (data) => {
    return await get("/api/cashflow?" + data);
  },
  getCashFlowHistory: async (data) => {
    return await get("/api/cashflowDeposithistory?" + data);
  },

  getTest: async () => {
    return await get("/api/test");
  },

  // Post Request
  postRegister: async (data) => {
    return await post("/api/register", data);
  },
  postLogin: async (data) => {
    return await post("/api/login", data);
  },
  postBalance: async (data) => {
    return await post("/api/getBalance", data);
  },
  gameLogin: async (data) => {
    return await post("/api/gameLogin", data);
  },
  addFav: async (data) => {
    return await post("/api/addFav", data);
  },
  removeFav: async (data) => {
    return await post("/api/removeFav", data);
  },
  getFav: async (data) => {
    return await post("/api/getFav", data);
  },
  forgotPassword: async (data) => {
    return await post("/api/forgotPassword", data);
  },
  resetPassword: async (data) => {
    return await post("/api/resetPassword", data);
  },

  forceLogout: async (data) => {
    return await post("/api/forceLogout", data);
  },
  gameInHouseLogin: async (data) => {
    return await post("/api/gameInHouseLogin", data);
  },
  gameInHouseLoginPoker: async (data) => {
    return await post("/api/game/pokerLogin", data);
  },

  postUpdateUserinfo: async (data) => {
    return await post("/api/updateruserinfo", data);
  },
  postChangePassword: async (data) => {
    return await post("/api/changepassword", data);
  },

  postDeposit: async (data) => {
    return await post("/api/deposit", data);
  },
  postPaymentsInfo: async (data) => {
    return await post("/api/deposit/getMethod", data);
  },

  postWithdraw: async (data) => {
    return await post("/api/withdraw", data);
  },
  postlaunchGameInhouse: async (data) => {
    return await post("/api/game/launchGame", data);
  },
  postlaunchGameliveLogin: async (data) => {
    return await post("/api/game/liveLogin", data);
  },
  // CHAT SYSTEM
  addMessageChat: async (data) => {
    return await post("/api/chat/addMessage", data);
  },
  fetchMessageGuest: async (data) => {
    return await post("/api/chat/fetchMessageGuest", data);
  },
  flushGuestChat: async (data) => {
    return await post("/api/chat/flushGuestChat", data);
  },
  uploadImageChat: async (data) => {
    return await post("/api/chat/uploadImageChat", data);
  },

  // SABONG
  sabongLogin: async (data) => {
    return await post("/api/sabong/login", data);
  },
  sabongPlaceBet: async (data) => {
    return await post("/api/sabong/placeBet", data);
  },
  sabonggetGame: async (data) => {
    return await post("/api/sabong/getGame", data);
  },
  postFetchReglada: async (data) => {
    return await post("/api/sabong/fetchReglada", data);
  },

  // LOTTERY
  postPlaceBet2D: async (data) => {
    return await post("/api/lottery/placeBet2D", data);
  },
  postPlaceBet3D: async (data) => {
    return await post("/api/lottery/placeBet3D", data);
  },
  postPlaceBetP3: async (data) => {
    return await post("/api/lottery/placeBetP3", data);
  },
};
