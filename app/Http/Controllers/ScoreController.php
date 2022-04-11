<?php

namespace App\Http\Controllers;

use App\Models\Score;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ScoreController extends Controller
{
    private const ERROR_MESSAGE = ['error' => 'Something went wrong. Please try again later'];
    private const ERR_RESPONSE_CODE = 500;
    private const MAX_NUM_OF_SCORES = 15;
    public function addScore(Request $request) {
        $request->validate([
            'word' => 'required|string|max:4',
            'time' => 'required|numeric',
        ]);
        try {
            $score_model = new Score();
            $score_model->word = $request->input('word');
            $score_model->time = $request->input('time');
            $score_model->saveOrFail();
            return Response::HTTP_CREATED;
        } catch (\Throwable $e) {
           return response()->json(self::ERROR_MESSAGE, self::ERR_RESPONSE_CODE);
        }
    }

    public function getScore(): JsonResponse
    {
        try {
            $scores_collection = Score::orderByDesc('time')->take(self::MAX_NUM_OF_SCORES)->get();
            $score_arr = [];
            // extracting the ids of the top 15 then deleting the rest
            foreach ($scores_collection as $score) {
                $score_arr[] = $score->id;
            }
            Score::whereNotIn('id', $score_arr)->delete();
            return $scores_collection;
        } catch (\Exception $e) {
            return response()->json(self::ERROR_MESSAGE, self::ERR_RESPONSE_CODE);
        }
    }
}
