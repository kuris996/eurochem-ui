import { extend } from 'umi-request'
import router from 'umi/router'

/*
const codeMessage = {
    200: 'Хорошо. ',
    201: 'Cоздано.',
    202: 'Принято. ',
    204: 'Нет содержимого. ',
    400: 'Плохой, неверный запрос. ',
    401: 'Не авторизован. ',
    403: 'Запрещено. ',
    404: 'Не найдено. ',
    406: 'Неприемлемо. ',
    410: 'Удалён. ',
    422: 'Необрабатываемый экземпляр. ',
    500: 'Внутренняя ошибка сервера. ',
    502: 'Плохой, ошибочный шлюз. ',
    503: 'Сервис недоступен. ',
    504: 'Шлюз не отвечает. ',
};
*/

const errorHandler = error => {
    const { response = {} } = error;
    const { status } = response;

    if (status === 401) {
        return;
    }
    // environment should not be used
    if (status === 403)
        router.push('/exception/403')
    else if (status <= 504 && status >= 500) 
        router.push('/exception/500')
    else if (status >= 404 && status < 422)
        router.push('/exception/404')
};

const request = extend({
    errorHandler,
    credentials: 'include' 
});

export default request;