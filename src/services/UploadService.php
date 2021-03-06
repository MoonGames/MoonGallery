<?php

/*
 * Copyright (C) 2014 Martin Indra <martin.indra at mgn.cz>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

require_once 'services/iService.php';
require_once 'services/upload/CreateGalleryService.php';
require_once 'services/upload/UploadPhotoService.php';

class UploadService implements iService {

    public function process($params) {
        if (!UploadService::canUpload()) {
            return false;
        }

        if (isset($params["create"])) {
            $service = new CreateGalleryService();
        } else {
            $service = new UploadPhotoService();
        }

        return $service->process($params);
    }

    public static function canUpload() {
        global $login;
        return $login->isLoggedIn() && $login->getUser()->getGroup(Group::$GROUP_ID_ADMIN) != null;
    }
}
