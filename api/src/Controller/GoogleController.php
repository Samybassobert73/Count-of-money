<?php

# Controller/GoogleController
namespace App\Controller;

use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

#[AsController]
class GoogleController extends AbstractController
{
    #[Route('/', name: 'dashboard')]
    public function index(): \Symfony\Component\HttpFoundation\Response
    {
        //Redirect to google
        return $this->render('google/index.html.twig');
    }

    #[Route('/connect/google', name: 'connect_google')]
    public function connectAction(ClientRegistry $clientRegistry): \Symfony\Component\HttpFoundation\RedirectResponse
    {
        //Redirect to google
        return $clientRegistry->getClient('google')->redirect([], []);
    }

    #[Route('/logout', name: 'app_logout')]
    public function logout(ClientRegistry $clientRegistry): \Symfony\Component\HttpFoundation\RedirectResponse
    {
        return $this->redirectToRoute('dashboard');
    }

    /**
     * After going to Google, you're redirected back here
     * because this is the "redirect_route" you configured
     * in config/packages/knpu_oauth2_client.yaml
     */
    #[Route('/connect/google/check', name: 'connect_google_check')]
    public function connectCheckAction(Request $request, ClientRegistry $clientRegistry): \Symfony\Component\HttpFoundation\RedirectResponse|JsonResponse
    {
        if (!$this->getUser()) {
            return new JsonResponse (array('status' => false, 'message' => "User not found!"));
        } else {
            return $this->redirectToRoute('dashboard');
        }
    }
}
