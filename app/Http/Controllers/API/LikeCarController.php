<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Like;
use App\Models\Car;

class LikeCarController extends Controller
{
    public function index()
    {
        $likes = Like::all();
        return response()->json([
            'likes' => $likes
        ], 200);
    }

    public function store(Request $request)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'user_id' => 'nullable',
                'car_id' => 'required|exists:car,id',
            ]
        );

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        try {
            if (auth('sanctum')->check()) {}
            // Creating the like record with the request data
            $car_id = $request->car_id;
            $user_id = $request->user_id;
            $carcheck = Car::where('id', $car_id)->first();
            if ($carcheck) {
                if (Like::where('car_id', $car_id)->where('user_id', $user_id)->exists()) {
                    return response()->json(['message' => $carcheck->c_name . "ถูกใจเเล้ว"],  400);
                } else {
                    $like = Like::create([
                        'user_id' => $request->user_id,
                        'car_id' => $request->car_id,
                    ]);
                        return response()->json(['message' => 'Car liked successfully'], 200);

                    }
                } else {
                    return response()->json(['message' => 'ไม่พบรถในฐานข้อมูล'], 404);
                }
            }  catch (\Exception $e) {
                return response()->json(['message' => 'มีบางอย่างผิดพลาดจริงๆ!'], 500);
            }
    }

    public function show($id)
    {
        $likes = Like::find($id);
        if (!$likes) {
            return response()->json([
                'massage' => 'Like not found!'
            ], 404);
        }
        return response()->json([
            'likes' => $likes
        ], 200);
    }

    public function destroy($id)
    {
        $likes = Like::find($id);
        if (!$likes) {
            return response()->json([
                'message' => "like not found"
            ], 404);
        }

        $likes->delete();

        return response()->json([
            'message' => "Like successfully deleted."
        ], 200);
    }
}
