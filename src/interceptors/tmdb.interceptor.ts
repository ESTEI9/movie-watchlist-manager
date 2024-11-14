import { HttpInterceptorFn } from '@angular/common/http';

export const tmdbInterceptor: HttpInterceptorFn = (req, next) => {
  const newRequest = req.clone({
    headers: req.headers.set("Authorization", `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDJjOWZiNzE4NjQ3ZGQzZDgwNmUzZTZmNDVkZjM4YiIsIm5iZiI6MTczMTQ1MzcyMy4zMjk2NDYzLCJzdWIiOiI2NzMzZGZkZTJkMjM3NTExYTAxOWU4NzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xplhG4camyzFvAUO_GXMzwnPYgQNcqpWSGF793va1Co`)
  });

  return next(newRequest);
};
