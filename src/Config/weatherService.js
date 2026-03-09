import AxiosConfig from "../Config/axiosConfig";

const resourcePath = "weatherForecast";

export async function fetchWeatherForecast() {
    const response = await AxiosConfig.get(`${resourcePath}`);
    return response.data;
}