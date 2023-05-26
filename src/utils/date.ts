import dayjs from "dayjs";

export const formatDate = (value: string) => dayjs(value).format("MM/DD/YYYY");
