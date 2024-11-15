export function debounce(fn, delay) {
  let timer; // 维护一个 timer
  return function () {
    let _this = this; // 取debounce执行作用域的this
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(_this, args); // 用apply指向调用debounce的对象，相当于_this.fn(args);
    }, delay);
  };
}
