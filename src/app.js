export const dva = {
    config: {
        onError(err) {
            err.preventDefault();
            console.error(err.message);
        },
    },
};

// https://umijs.org/zh/guide/runtime-config.html#render
export function render(oldRender) {
    oldRender();
}