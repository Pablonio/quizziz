// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';

type Roles = 'Estudiante' | 'Profesor';
type ProtectedRoutes = {
  [key in Roles]: string[];
};

const protectedRoutes: ProtectedRoutes = {
  Estudiante: ['/Paginas/Estudiante', '/Paginas/Estudiante/Examen/[id]'],
  Profesor: ['/Paginas/Profesor', '/Paginas/Profesor/Examen/[id]'], // Usamos [id] en lugar de ${id}
};

export async function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie');
  const cookies = cookieHeader ? parse(cookieHeader) : {};
  const token = cookies.token;
  const rol = cookies.rol as Roles;

  if (!token || !rol) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const allowedPaths = protectedRoutes[rol];
  if (allowedPaths && !allowedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/Paginas/Estudiante/:path*', '/Paginas/Estudiante/Examen/:id/:path*' , '/Paginas/Profesor/Examen/:id/:path*', '/Paginas/Profesor/:path*'],
};
