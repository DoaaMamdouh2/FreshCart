import { AllProductResponse, Daum } from "./home.interface";

export async function getAllProducts():Promise<Daum[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`)
    const {data}:AllProductResponse = await response.json()

    return data

}