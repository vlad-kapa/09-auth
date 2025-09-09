import { NextRequest, NextResponse } from "next/server";
import { api } from '../api';
import { isAxiosError } from "axios";
import { logErrorResponse } from '../_utils/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); 

    const apiRes = await api.post("/auth/signup", body, {
      headers: { "Content-Type": "application/json" },
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status ?? 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
